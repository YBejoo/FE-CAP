import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/main-layout.tsx", [
    // Dashboard
    index("pages/dashboard.tsx"),
    
    // Master Data - Kurikulum
    route("kurikulum", "pages/kurikulum.tsx"),
    route("profil-lulusan", "pages/profil-lulusan.tsx"),
    route("cpl", "pages/cpl.tsx"),
    route("bahan-kajian", "pages/bahan-kajian.tsx"),
    route("mata-kuliah", "pages/mata-kuliah.tsx"),
    route("matrix-cpl-mk", "pages/matrix-cpl-mk.tsx"),
    
    // RPS & CPMK
    route("cpmk", "pages/cpmk.tsx"),
    route("rps", "pages/rps/index.tsx"),
    route("rps/new", "pages/rps/new.tsx", { id: "rps-new" }),
    route("rps/:id/edit", "pages/rps/new.tsx", { id: "rps-edit" }),
    
    // Laporan
    route("laporan", "pages/laporan.tsx"),
  ]),
] satisfies RouteConfig;
