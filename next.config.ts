import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      // El capture del pago puede pesar hasta 4 MB (ver power-beach/constants.ts)
      bodySizeLimit: "4.5mb",
    },
  },
};

export default nextConfig;
