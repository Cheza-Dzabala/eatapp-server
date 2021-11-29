import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { MenuService } from './menu.service'
import { Menu } from './interfaces/menu.interface'
import { Item } from 'src/items/interface/items.interface'
import { MenuDto } from './dto/menu.dto'

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    // Get all menu items
    @Get('/')
    async findAll(): Promise<Menu[]> {
        return await this.menuService.findAll()
    }

    @Get('/:id')
    async findOne(@Param('id') id: string): Promise<void | Menu> {
        return this.menuService.findOne(parseInt(id))
    }

    @Get('items/:id')
    findItems(@Param('id') id: string): Promise<Item[]> {
        return this.menuService.findItems(parseInt(id))
    }

    @Post('/')
    async create(@Body() menuDto: MenuDto): Promise<Menu> {
        return await this.menuService.create(menuDto)
    }
}
