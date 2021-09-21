require("dotenv").config();

module.exports = {
  type: "postgres",
  // url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  migrations: ["src/core/data/database/migrations/**/*"],
  entities: ["src/core/data/database/entities/**/*"],
  cli: {
    entitiesDir: "src/core/data/database/entities",
    migrationsDir: "src/core/data/database/migrations",
  },
};
