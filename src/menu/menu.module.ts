import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { Item } from 'src/items/enitity/item.entity'
import { ItemsService } from 'src/items/items.service'
import { OrderItem } from 'src/order-items/entity/order-item.entity'
import { Menu } from './entity/menu.entity'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'

@Module({
    imports: [TypeOrmModule.forFeature([Menu, Item, OrderItem]), AuthModule],
    controllers: [MenuController],
    providers: [MenuService, ItemsService],
})
export class MenuModule {}
