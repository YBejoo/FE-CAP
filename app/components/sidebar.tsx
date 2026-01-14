import { Link, useLocation } from "react-router";
import { NAV_ITEMS } from "~/lib/constants";

export function Sidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "180px",
        height: "100vh",
        backgroundColor: "#ffffff",
        color: "#1e293b",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        borderRight: "1px solid #e2e8f0",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #e2e8f0",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#3b82f6",
        }}
      >
        SI-CAP
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, paddingTop: "8px" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              style={{
                display: "block",
                padding: "12px 16px",
                color: isActive ? "#3b82f6" : "#64748b",
                backgroundColor: isActive ? "#eff6ff" : "transparent",
                textDecoration: "none",
                fontSize: "14px",
                borderLeft: isActive ? "3px solid #3b82f6" : "3px solid transparent",
                marginLeft: "4px",
                fontWeight: isActive ? "600" : "400",
              }}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
