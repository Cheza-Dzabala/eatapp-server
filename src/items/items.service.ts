import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Menu } from 'src/menu/entity/menu.entity'
import { Repository } from 'typeorm'
import { ItemDto } from './dto/item.dto'
import { Item } from './enitity/item.entity'

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,

        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>
    ) {}

    async find(id: number): Promise<Item[]> {
        const menu = await this.menuRepository.findOne({
            where: { id },
        })
        return await this.itemRepository.find({
            where: {
                menu: menu,
            },
        })
    }

    async findOne(id: number): Promise<Item> {
        return await this.itemRepository.findOne({
            where: {
                id,
            },
        })
    }

    async create(item: ItemDto): Promise<Item> {
        const menu = await this.menuRepository.findOne({
            where: {
                id: item.menu,
            },
        })
        const newItem = new Item()
        newItem.name = item.name
        newItem.price = item.price
        newItem.description = item.description
        newItem.image = item.image
        newItem.menu = menu
        return await this.itemRepository.save(newItem)
    }
}
