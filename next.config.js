/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      // backend local/prod
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/media/**" },

      // OpenStreetMap (staticmap)
      { protocol: "https", hostname: "staticmap.openstreetmap.de", pathname: "/staticmap.php" },
    ],
  },
};
