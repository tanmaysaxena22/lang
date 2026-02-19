/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'urban-broccoli-v6rx6pggwpqv2564-3000.app.github.dev', // Add your specific URL here
        'localhost:3000'
      ],
    },
  },
};

export default nextConfig;