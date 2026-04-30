import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</eg.glb>; rel=preload; as=fetch',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

module.exports = {
  allowedDevOrigins: ['192.168.20.18'],
  
}