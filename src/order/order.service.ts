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
import { UpdateOrderDto } from './dto/update-order.dto'

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

    async findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne({ where: { id: id } })
    }

    async find(user: User): Promise<Order[]> {
        const orders = await this.orderRepository.find({
            where: {
                user: user,
            },
        })
        return orders
    }

    async update(id: number, order: UpdateOrderDto): Promise<Order> {
        const orderToUpdate = await this.orderRepository.findOne({
            where: { id: id },
        })
        orderToUpdate.status = order.status
        return this.orderRepository.save(orderToUpdate)
    }
}
