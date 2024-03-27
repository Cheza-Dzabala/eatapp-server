import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Item } from 'src/items/enitity/item.entity'
import { ItemsService } from 'src/items/items.service'
import { Repository } from 'typeorm'
import { MenuDto } from './dto/menu.dto'
import { Menu } from './entity/menu.entity'

@Injectable()
export class MenuService {
    constructor(
        private readonly itemsService: ItemsService,
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>
    ) {}

    async create(menu: MenuDto): Promise<Menu> {
        const allMenus = await this.menuRepository.find()
        const menuExists = allMenus.find((m) => m.name === menu.name)

        if (!menuExists) {
            const menuEntity: Menu = await this.menuRepository.create(menu)
            return this.menuRepository.save(menuEntity)
        }

        throw new BadRequestException('Menu already exists')
    }

    async findAll(): Promise<Menu[]> {
        return await this.menuRepository.find()
    }

    async findOne(id: number): Promise<Menu> {
        const menu = await this.menuRepository.findOne({ where: { id } })
        if (!menu) {
            throw new NotFoundException('Menu not found')
        }

        return menu
    }

    async findItems(id: number): Promise<Item[]> {
        return await this.itemsService.find(id)
    }
}
