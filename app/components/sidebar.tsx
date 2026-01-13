import { useState } from "react";
import { useLocation } from "react-router";
import { Icons, type IconName } from "~/components/ui/icons";
import { cn } from "~/lib/utils";
import { APP_NAME, NAV_ITEMS, PRODI_NAME } from "~/lib/constants";

interface SidebarItemProps {
  title: string;
  href?: string;
  icon: string;
  children?: { title: string; href: string; icon: string }[];
  isActive?: boolean;
}

function SidebarItem({ title, href, icon, children, isActive }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const IconComponent = Icons[icon as IconName];

  if (children) {
    const hasActiveChild = children.some((child) => location.pathname === child.href);

    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            hasActiveChild
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <div className="flex items-center gap-3">
            {IconComponent && <IconComponent size={20} />}
            <span>{title}</span>
          </div>
          <Icons.ChevronDown
            size={16}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </button>
        {isOpen && (
          <div className="ml-6 mt-1 space-y-1">
            {children.map((child) => {
              const ChildIcon = Icons[child.icon as IconName];
              const isChildActive = location.pathname === child.href;
              return (
                <a
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isChildActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {ChildIcon && <ChildIcon size={18} />}
                  <span>{child.title}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={href || "/"}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {IconComponent && <IconComponent size={20} />}
      <span>{title}</span>
    </a>
  );
}

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <Icons.GraduationCap size={32} className="text-primary" />
            <div>
              <h1 className="text-lg font-bold text-primary">{APP_NAME}</h1>
              <p className="text-xs text-muted-foreground">Manajemen Informatika</p>
            </div>
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              href={"href" in item ? item.href : undefined}
              icon={item.icon}
              children={"children" in item ? [...item.children] as { title: string; href: string; icon: string }[] : undefined}
              isActive={"href" in item && item.href === location.pathname}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t px-6 py-4">
          <p className="text-xs text-muted-foreground text-center">
            © 2026 {PRODI_NAME}
          </p>
        </div>
      </div>
    </aside>
  );
}
