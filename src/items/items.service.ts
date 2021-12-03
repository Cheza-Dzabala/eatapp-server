import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ItemDto } from './dto/item.dto'
import { Repository } from 'typeorm'
import { Item } from './enitity/item.entity'
import { Menu } from 'src/menu/entity/menu.entity'

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,

        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>
    ) {}

    async find(id: number): Promise<Item[]> {
        const menu = await this.menuRepository.findOne(id)
        return await this.itemRepository.find({ menu: menu })
    }

    async findOne(id: number): Promise<Item> {
        return await this.itemRepository.findOne(id)
    }

    async create(item: ItemDto): Promise<Item> {
        const menu = await this.menuRepository.findOne(item.menu)
        const newItem = new Item()
        newItem.name = item.name
        newItem.price = item.price
        newItem.description = item.description
        newItem.image = item.image
        newItem.menu = menu
        return await this.itemRepository.save(newItem)
    }
}
