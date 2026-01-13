import { Outlet } from "react-router";
import { Sidebar } from "~/components/sidebar";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64">
        <Outlet />
      </main>
    </div>
  );
}
