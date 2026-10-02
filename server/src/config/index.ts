export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET || 'english-6-sinf-jwt-secret-key-production-ready',
  jwtExpiresIn: '7d',
  isProduction: process.env.NODE_ENV === 'production'
};
