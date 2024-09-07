require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    migrationStorageTableName: 'migrations',
    seederStorageTableName: 'seeders',
    migrations: path.resolve(__dirname, '../database/migrations'), // Путь к миграциям
    models: path.resolve(__dirname, '../database/models'), // Путь к моделям
    seeders: path.resolve(__dirname, '../database/seeders'), // Путь к сидерам
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    migrationStorageTableName: 'migrations',
    seederStorageTableName: 'seeders',
    migrations: path.resolve(__dirname, '../database/migrations'),
    models: path.resolve(__dirname, '../database/models'),
    seeders: path.resolve(__dirname, '../database/seeders'),
  },
};
