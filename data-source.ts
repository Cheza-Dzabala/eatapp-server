import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migration/*.ts'],
    synchronize: false,
    logging: true,
})
