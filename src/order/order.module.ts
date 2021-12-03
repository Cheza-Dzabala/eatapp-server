import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { ItemsService } from 'src/items/items.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from 'src/items/enitity/item.entity'
import { Order } from './entity/order.entity'
import { OrderItem } from 'src/order-items/entity/order-item.entity'
import { OrderItemsService } from 'src/order-items/order-items.service'
import { User } from 'src/users/entity/user.entity'
import { AuthService } from 'src/auth/auth.service'
import { UsersService } from 'src/users/users.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'src/auth/constants'
import { Menu } from 'src/menu/entity/menu.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([Item, Order, OrderItem, User, Menu]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10d' },
        }),
    ],
    providers: [
        OrderService,
        ItemsService,
        OrderItemsService,
        AuthService,
        UsersService,
    ],
    controllers: [OrderController],
})
export class OrderModule {}
