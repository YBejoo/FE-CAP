import { Outlet } from "react-router";
import { Sidebar } from "~/components/sidebar";
import { Header } from "~/components/header";

export default function MainLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: "180px", display: "flex", flexDirection: "column" }}>
        {/* Header - Fixed */}
        <div style={{ position: "sticky", top: 0, zIndex: 40 }}>
          <Header />
        </div>

        {/* Page Content */}
        <main style={{ flex: 1, padding: "24px", backgroundColor: "#f8fafc" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
