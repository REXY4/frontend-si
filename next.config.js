/** @type {import('next').NextConfig} */
const nextConfig = {
  //  eslint: {
  //   ignoreDuringBuilds: true,
  // },
  reactStrictMode: true,
  publicRuntimeConfig: {
    applicationName: 'LSI PDT',
    // apiUrl: "https://devapp.superindo.co.id/LSIWM",
    apiUrl: 'https://localhost:7195/api',
    // lsifApiUrl: "https://devapp.superindo.co.id/Basis_LSIF/api/",
    lsifApiUrl: 'https://localhost:7195/api',
    appLogo: 'http://localhost:3000/superindo.jpg',
  },
};

module.exports = nextConfig;
