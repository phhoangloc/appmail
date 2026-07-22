import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    gmail_user: process.env.gmail_user,
    gmail_pass: process.env.gmail_pass
  }
};

export default nextConfig;
