import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { FilesModule } from './files/files.module'
import { ItemsModule } from './items/items.module'
import { MenuModule } from './menu/menu.module'
import { OrderItemsModule } from './order-items/order-items.module'
import { OrderModule } from './order/order.module'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ['dist/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            logging: true,
            synchronize: true,
            ssl: {
                rejectUnauthorized: false,
            },
        }),
        AuthModule,
        UsersModule,
        MenuModule,
        ItemsModule,
        OrderModule,
        OrderItemsModule,
        FilesModule,
        MulterModule.register({
            dest: './images',
        }),
    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
