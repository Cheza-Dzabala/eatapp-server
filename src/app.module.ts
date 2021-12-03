import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { MenuModule } from './menu/menu.module'
import { ItemsModule } from './items/items.module'
import { OrderModule } from './order/order.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderItemsModule } from './order-items/order-items.module'
import { FilesModule } from './files/files.module'
import { MulterModule } from '@nestjs/platform-express'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        AuthModule,
        UsersModule,
        MenuModule,
        ItemsModule,
        OrderModule,
        OrderItemsModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(),
        FilesModule,
        MulterModule.register({
            dest: './images',
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
