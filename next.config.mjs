import withPWA from "next-pwa";
import path from "path";
/* const withPWA = require('next-pwa')({
  dest: 'public'
}) */
const withPWAWrapper = withPWA({
  dest: "public",
  register: true,
  cacheOnFrontEndNav: true,
  runtimeCaching: [
    {
      urlPattern: /^\/products$/,
      handler: "CacheFirst",
      options: {
        cacheName: "products-cache",
      },
    },
    {
      urlPattern: /\/(customers)\/(.*)/,
      handler: "CacheFirst",
      options: {
        cacheName: "customers-cache",
      },
    },
    {
      urlPattern: /\/(providers)\/(.*)/,
      handler: "CacheFirst",
      options: {
        cacheName: "providers-cache",
      },
    },
    {
      urlPattern: /\/(sales)\/(.*)/,
      handler: "CacheFirst",
      options: {
        cacheName: "sales-cache",
      },
    },
    {
      urlPattern: /\/(movements)\/(.*)/,
      handler: "CacheFirst",
      options: {
        cacheName: "movements-cache",
      },
    },
    {
      urlPattern: /\/(stock)\/(.*)/,
      handler: "CacheFirst",
      options: {
        cacheName: "stock-cache",
      },
    },
    {
      urlPattern: /^\/$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-cache",
      },
    },
    {
      urlPattern: /\/_next\/static\/(.*)/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-cache",
      },
    },
    {
      urlPattern: /\/(manifest|favicon|icons)\.(.*)/,
      handler: "CacheFirst",
      options: {
        cacheName: "manifest-cache",
      },
    },
  ],
  buildExcludes: ["app-build-manifest.json"],
});

/* const generateAppDirEntry = (entry) => {
  const packagePath =  "next-pwa/register.js";
  const packageDirectory = path.dirname(packagePath);
  const registerJs = path.join(packageDirectory, "register.js");

  return entry().then((entries) => {
    // Register SW on App directory, solution: https://github.com/shadowwalker/next-pwa/pull/427
    if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
      if (Array.isArray(entries["main-app"])) {
        entries["main-app"].unshift(registerJs);
      } else if (typeof entries["main-app"] === "string") {
        entries["main-app"] = [registerJs, entries["main-app"]];
      }
    }
    return entries;
  });
}; */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* webpack: (config) => {
    const entry = generateAppDirEntry(config.entry);
    config.entry = () => entry;

    return config;
  }, */
};

export default withPWAWrapper(nextConfig);
