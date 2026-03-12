/**
 * Loading & Skeleton Components
 * Standardized loading states untuk aplikasi
 */

// Loading Spinner
export function LoadingSpinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[size]} ${className}`} role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}

// Table Skeleton Loader
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="w-full animate-pulse">
      {/* Header */}
      <div className="flex gap-4 mb-4 pb-3 border-b border-gray-200">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded flex-1"></div>
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 mb-3">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-8 bg-gray-100 rounded flex-1"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Card Skeleton
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-100 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
        </div>
      ))}
    </>
  );
}

// Form Skeleton
export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i}>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-10 bg-gray-100 rounded w-full"></div>
        </div>
      ))}
      <div className="flex gap-2 pt-4">
        <div className="h-10 bg-gray-200 rounded w-24"></div>
        <div className="h-10 bg-gray-100 rounded w-24"></div>
      </div>
    </div>
  );
}

// Full Page Loading
export function PageLoading({ message = "Memuat data..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <LoadingSpinner size="lg" className="text-blue-600" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

// Button Loading State
export function ButtonLoading({ children, isLoading, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) {
  return (
    <button {...props} disabled={isLoading || props.disabled} className={`relative ${props.className || ''}`}>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </span>
      )}
      <span className={isLoading ? 'invisible' : ''}>{children}</span>
    </button>
  );
}
