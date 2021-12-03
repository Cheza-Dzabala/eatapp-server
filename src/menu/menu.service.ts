import { Injectable } from '@nestjs/common'
import { ItemsService } from 'src/items/items.service'
import { MenuDto } from './dto/menu.dto'
import { Menu } from './entity/menu.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Item } from 'src/items/enitity/item.entity'

@Injectable()
export class MenuService {
    constructor(
        private readonly itemsService: ItemsService,
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>
    ) {}

    create(menu: MenuDto): Promise<Menu> {
        const menuEntity: Menu = this.menuRepository.create(menu)
        return this.menuRepository.save(menuEntity)
    }

    findAll(): Promise<Menu[]> {
        return this.menuRepository.find()
    }

    findOne(id: number): Promise<Menu> {
        return this.menuRepository.findOne({ id })
    }

    findItems(id: number): Promise<Item[]> {
        return this.itemsService.find(id)
    }
}
