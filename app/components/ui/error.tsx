/**
 * Error Display Components
 * Standardized error handling UI
 */

import { Icons } from './icons';
import { Button } from './button';

// Error Message Component
export function ErrorMessage({ 
  message, 
  onRetry, 
  title = "Terjadi Kesalahan" 
}: { 
  message: string; 
  onRetry?: () => void;
  title?: string;
}) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Icons.AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 mb-1">{title}</h3>
          <p className="text-red-800 text-sm">{message}</p>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-3 text-red-700 border-red-300 hover:bg-red-50"
            >
              <Icons.RefreshCw size={16} className="mr-2" />
              Coba Lagi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline Error (for forms)
export function InlineError({ message }: { message: string }) {
  return (
    <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
      <Icons.AlertCircle size={16} />
      {message}
    </p>
  );
}

// Full Page Error
export function PageError({ 
  message, 
  onRetry,
  title = "Terjadi Kesalahan"
}: { 
  message: string; 
  onRetry?: () => void;
  title?: string;
}) {
  return (
    <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
      <div className="max-w-md w-full">
        <ErrorMessage message={message} onRetry={onRetry} title={title} />
      </div>
    </div>
  );
}

// Empty State Component
export function EmptyState({ 
  title = "Tidak ada data",
  description,
  action,
  IconComponent = Icons.AlertCircle
}: { 
  title?: string;
  description?: string;
  action?: React.ReactNode;
  IconComponent?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8" style={{ minHeight: '300px' }}>
      <IconComponent size={48} className="text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-4 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
