import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { jwtConstants } from 'src/auth/constants'
import { Item } from 'src/items/enitity/item.entity'
import { ItemsService } from 'src/items/items.service'
import { Menu } from 'src/menu/entity/menu.entity'
import { OrderItem } from 'src/order-items/entity/order-item.entity'
import { OrderItemsService } from 'src/order-items/order-items.service'
import { User } from 'src/users/entity/user.entity'
import { UsersService } from 'src/users/users.service'
import { Order } from './entity/order.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

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
