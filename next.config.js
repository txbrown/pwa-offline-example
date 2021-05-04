const withPWA = require('next-pwa');
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  pwa: {
    disable: !isProd,
    dest: 'public',
  },
  env: {},
};

module.exports = withPWA(nextConfig);
