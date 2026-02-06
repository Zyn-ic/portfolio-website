/** @type {import('next').NextConfig} */

// Polyfill for Node.js 25+ internal localStorage issue
if (
  typeof localStorage !== 'undefined' &&
  typeof localStorage.getItem !== 'function'
) {
  const noop = () => {};
  const storageMock = {
    getItem: () => null,
    setItem: noop,
    removeItem: noop,
    clear: noop,
    length: 0,
    key: () => null,
  };
  
  global.localStorage = storageMock;
  global.sessionStorage = storageMock;
}

const nextConfig = {
  output: 'export',
  distDir: process.env.NODE_ENV === 'production' ? 'out' : '.next',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Handle GitHub Pages subdirectory if needed
  basePath: process.env.NODE_ENV === 'production' ? process.env.BASE_PATH || '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.BASE_PATH || '' : ''
};

module.exports = nextConfig;
