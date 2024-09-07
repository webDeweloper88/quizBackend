export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    FRONTEND_URL: process.env.FRONTEND_URL,
    APP_URL: process.env.APP_URL,
  },

  database: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT, 10) || 5432,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '3600',
  },
});
