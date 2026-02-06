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
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
