import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages가 저장소 루트를 서빙하므로 빌드 산출물을 루트에 떨군다.
// - 소스는 app/ 안에 있고, 빌드된 index.html이 루트에 생성된다
// - JS/CSS 번들은 build/ 로, 최적화된 미디어는 assets/web/ 로 분리 (서로 안 건드림)
// - emptyOutDir:false — 루트를 비우면 .git / CNAME / assets 가 날아간다
export default defineConfig({
  root: "app",
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../",
    emptyOutDir: false,
    assetsDir: "build",
  },
});
