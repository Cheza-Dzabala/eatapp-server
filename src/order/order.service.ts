import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderDto } from './dto/order.dto'
import { Order } from './interface/order.interface'
import { Order as OrderEntity } from './entity/order.entity'
import { Repository } from 'typeorm'
import { OrderItemsService } from 'src/order-items/order-items.service'
import { OrderItemsDto } from 'src/items/dto/order-items.dto'
import { Item } from 'src/items/enitity/item.entity'
import { User } from 'src/users/entity/user.entity'

@Injectable()
export class OrderService {
    constructor(
        private readonly orderItemService: OrderItemsService,
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>,
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    private readonly orders: Order[] = []

    async create(order: OrderDto): Promise<Order> {
        // Create and save an order
        const newOrder = new OrderEntity()
        const user = await this.userRepository.findOne({ id: order.userId })
        newOrder.createdAt = new Date()
        newOrder.status = 'pending'
        newOrder.user = user
        const savedOrder = await this.orderRepository.save(newOrder)

        order.items.forEach(async (item: OrderItemsDto) => {
            item.order = savedOrder.id
            item.item = item.id
            const itemEntity: Item = await this.itemRepository.findOne({
                id: item.item,
            })
            await this.orderItemService.create(item, savedOrder, itemEntity)
        })

        return savedOrder
    }

    async findAll(): Promise<OrderEntity[]> {
        return this.orderRepository.find()
    }
}
