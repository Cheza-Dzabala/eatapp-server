import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderItem } from './entity/order-item.entity'
import { OrderItemsService } from './order-items.service'

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem])],
    providers: [OrderItemsService],
})
export class OrderItemsModule {}
