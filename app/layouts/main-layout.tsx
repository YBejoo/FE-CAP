import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Sidebar } from "~/components/sidebar";
import { Header } from "~/components/header";
import { SidebarProvider, useSidebar } from "~/contexts/sidebar-context";
import { useAuth } from "~/contexts/auth-context";
import { TOKEN_KEY } from "~/lib/api";

function MainLayoutContent() {
  const { isCollapsed } = useSidebar();
  const { isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();

  // Debug log
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem(TOKEN_KEY);
    console.log("MainLayout state:", { 
      isAuthenticated, 
      loading, 
      hasUser: !!user,
      hasToken: !!token
    });
  }, [isAuthenticated, loading, user]);

  // Protected route - redirect to login if not authenticated
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Only redirect if we're not loading AND truly not authenticated
    // Check both user state and token to prevent race conditions
    const token = localStorage.getItem(TOKEN_KEY);
    if (!loading && !isAuthenticated && !token) {
      console.log("MainLayout: Not authenticated and no token, redirecting to login");
      navigate("/login", { replace: true });
    } else if (!loading && !isAuthenticated && token) {
      console.log("MainLayout: Token exists but user state not ready yet, waiting...");
      // Give auth context time to load user from token
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // If token exists but user not loaded yet, show loading
  const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
  if (token && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  // Don't render layout if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div 
        className={`
          flex flex-col min-h-screen
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "ml-17" : "ml-60"}
        `}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>© 2026 SI-CAP - Sistem Informasi Capaian Pembelajaran</span>
            <span>Version 1.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function MainLayout() {
  return (
    <SidebarProvider>
      <MainLayoutContent />
    </SidebarProvider>
  );
}
