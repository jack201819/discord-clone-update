/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "uploadthing.com", // Add any other allowed domains here
      "utfs.io", // Add "utfs.io" to the list of allowed domains
    ],
  },
};

module.exports = nextConfig;
