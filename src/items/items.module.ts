import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from './enitity/item.entity'
import { OrderItem } from '../order-items/entity/order-item.entity'
import { ItemsController } from './items.controller'
import { ItemsService } from './items.service'

@Module({
    imports: [TypeOrmModule.forFeature([Item, OrderItem])],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule {}
