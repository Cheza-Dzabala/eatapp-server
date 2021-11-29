import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderItemsDto } from 'src/items/dto/order-items.dto'
import { Item } from 'src/items/enitity/item.entity'
import { Order } from 'src/order/entity/order.entity'
import { Repository } from 'typeorm'
import { OrderItem } from './entity/order-item.entity'

@Injectable()
export class OrderItemsService {
    constructor(
        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>
    ) {}

    async create(
        orderItem: OrderItemsDto,
        order: Order,
        item: Item
    ): Promise<OrderItem> {
        const newOrderItem = new OrderItem()
        newOrderItem.item = item
        newOrderItem.order = order
        newOrderItem.quantity = orderItem.quantity
        return this.orderItemsRepository.save(newOrderItem)
    }
}
