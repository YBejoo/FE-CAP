import { useLocation } from "react-router";
import { NAV_ITEMS } from "~/lib/constants";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const location = useLocation();

  // Generate breadcrumb from current path
  const getBreadcrumb = () => {
    const currentNav = NAV_ITEMS.find((item) => item.href === location.pathname);
    const pageName = currentNav?.title || title || "Page";

    if (location.pathname === "/") {
      return ["Home"];
    }

    return ["Home", pageName];
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header
      style={{
        height: "56px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        color: "#1e293b",
      }}
    >
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {breadcrumb.map((item, index) => (
          <span key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {index > 0 && <span style={{ color: "#94a3b8" }}>/</span>}
            <span style={{ color: index === breadcrumb.length - 1 ? "#1e293b" : "#64748b" }}>
              {item}
            </span>
          </span>
        ))}
      </div>

      {/* Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ color: "#64748b", fontSize: "14px" }}>[ Profile ]</span>
      </div>
    </header>
  );
}
