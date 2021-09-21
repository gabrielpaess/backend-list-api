require('dotenv').config();

const rootPath = process.env.NODE_ENV?.toLocaleLowerCase() === "production" ? 'dist' : 'src'

module.exports = {
    type: 'postgres',
    //url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    synchronize: false,
    logging: false,
    extra: {
        ssl: {
        rejectUnauthorized: false
        }
    },
    entities: [
        `${rootPath}/core/infra/data/database/entities/**/*`
    ],
    migrations: [
        `${rootPath}/core/infra/data/database/migrations/**/*`
    ],
    cli: {
        entitiesDir: `${rootPath}/core/infra/data/database/entities`,
        migrationsDir: `${rootPath}/core/infra/data/database/migrations`
    }
}