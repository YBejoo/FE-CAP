import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/main-layout.tsx", [
    // Dashboard
    index("pages/dashboard.tsx"),
    
    // Master Data
    route("prodi", "pages/prodi.tsx"),
    route("kurikulum", "pages/kurikulum.tsx"),
    route("cpl", "pages/cpl.tsx"),
    route("mata-kuliah", "pages/mata-kuliah.tsx"),
    route("cpmk", "pages/cpmk.tsx"),
    
    // RPS
    route("rps", "pages/rps/index.tsx"),
    route("rps/:id", "pages/rps/detail.tsx"),
    route("penilaian", "pages/penilaian.tsx"),
    
    // Laporan
    route("laporan", "pages/laporan.tsx"),
  ]),
] satisfies RouteConfig;
