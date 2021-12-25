module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'a0b966e4648fed94977b096083070f8b'),
  },
});
