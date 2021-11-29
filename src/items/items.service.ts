import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ItemDto } from './dto/item.dto'
import { Item } from './interface/items.interface'
import { Repository } from 'typeorm'
import { Item as ItemEntity } from './enitity/item.entity'
import { OrderItem as OrderItemEntity } from '../order-items/entity/order-item.entity'

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ItemEntity)
        private itemRepository: Repository<ItemEntity>,

        @InjectRepository(OrderItemEntity)
        private orderItemRepository: Repository<OrderItemEntity>
    ) {}

    async find(id: number): Promise<Item[]> {
        return await this.itemRepository.find({ menu: id })
    }

    async findOne(id: number): Promise<Item> {
        return await this.itemRepository.findOne(id)
    }

    async create(item: ItemDto): Promise<Item> {
        const newItem = this.itemRepository.create(item)
        return await this.itemRepository.save(newItem)
    }
}
