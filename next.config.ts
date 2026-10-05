import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Emit a static HTML export (out/) for Cloudflare Pages.
  output: "export",
  // Allow development server to be accessed from a specific origin.
  allowedDevOrigins: ["192.168.1.109"]
};

export default nextConfig;
