import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Emit a static HTML export (out/) for Cloudflare Pages.
  output: "export",
};

export default nextConfig;
