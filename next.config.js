// next.config.js
/** @type {import('next').NextConfig} */
const backendURL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const { hostname, protocol } = new URL(backendURL);

module.exports = {
  /*  ▸ render “stand‑alone” para que el contenedor solo
      necesite `node` sin dependencias extra                */
  output: "standalone",

  /*  ▸ NO dejes que advertencias de ESLint rompan el build.
      Las “errors” siguen deteniendo la compilación.         */
  eslint: {
    ignoreDuringBuilds: true,
  },

  /*  ▸ Dominios/paths desde los que Next <Image/> puede
      descargar imágenes (covers, galerías, mapas, …).       */
  images: {
    unoptimized: true, // Fix: Bypass Next.js optimization to avoid SSL/Port issues in production
    remotePatterns: [
      /* media del backend ─ producción o local  */
      {
        protocol: protocol.replace(":", ""), // "http" | "https"
        hostname: hostname,
        port: "",                                // any port
        pathname: "/media/**",
      },
      /* Fix: Allow port 8443 explicitly for production */
      {
        protocol: "https",
        hostname: hostname, // 138.117.85.187
        port: "8443",
        pathname: "/media/**",
      },
      /* Fix Docker interne */
      {
        protocol: "http",
        hostname: "api-vivatech",
        port: "8000",
        pathname: "/media/**",
      },
      /* mapa estático de wikimedia              */
      {
        protocol: "https",
        hostname: "maps.wikimedia.org",
        pathname: "/**",
      },
      // Allow general HTTPS in case IP changes or uses different domain
      {
        protocol: "https",
        hostname: "**",
      }
    ],
  },

  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: "http://api-vivatech:8000/media/:path*",
      },
    ];
  },
};
