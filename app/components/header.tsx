import { Icons } from "~/components/ui/icons";
import { Input } from "~/components/ui/input";

interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Icons.Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Cari..."
              className="w-64 pl-9"
            />
          </div>

          {/* User Menu */}
          <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-accent">
            <Icons.Users size={18} />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
