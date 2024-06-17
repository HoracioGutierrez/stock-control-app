import withPWA from "next-pwa";
/* const withPWA = require('next-pwa')({
  dest: 'public'
}) */

const withPWAWrapper = withPWA({
  dest: "public",
  register: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWAWrapper(nextConfig);
