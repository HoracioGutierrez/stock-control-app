import withPWA from "next-pwa";
/* const withPWA = require('next-pwa')({
  dest: 'public'
}) */

const withPWAWrapper = withPWA({
  dest: "public",
  register: true,
  cacheOnFrontEndNav : true,
  runtimeCaching : [
    {
      urlPattern : /\/(products)\/(.*)/,
      handler : "CacheFirst",
      options : {
        cacheName : "products-cache"
      }
    },
    {
      urlPattern : /\/(customers)\/(.*)/,
      handler : "CacheFirst",
      options : {
        cacheName : "customers-cache"
      }
    },
    {
      urlPattern : /\/(providers)\/(.*)/,
      handler : "CacheFirst",
      options : {
        cacheName : "providers-cache"
      }
    },
    {
      urlPattern : /\/(sales)\/(.*)/,
      handler : "CacheFirst",
      options : {
        cacheName : "sales-cache"
      }
    },
    {
      urlPattern : /\/(movements)\/(.*)/,
      handler : "CacheFirst",
      options : {
        cacheName : "movements-cache"
      }
    },
    {
      urlPattern : /\/(stock)\/(.*)/,
      handler : "CacheFirst",
      options : {
        cacheName : "stock-cache"
      }
    },
    {
      urlPattern : /^\/$/,
      handler : "CacheFirst",
      options : {
        cacheName : "static-cache"
      }
    },
    {
      urlPattern : /\/_next\/static\/(.*)/,
      handler : "CacheFirst",
      options : {
        cacheName : "static-cache"
      }
    }, 
    {
      urlPattern : /\/(manifest|favicon|icons)\.(.*)/,
      handler : "CacheFirst",
      options : {
        cacheName : "manifest-cache"
      }
    }
  ]
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWAWrapper(nextConfig);
