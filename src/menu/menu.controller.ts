import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from 'src/global/guards/roles.guard'
import { Item } from 'src/items/enitity/item.entity'
import { MenuDto } from './dto/menu.dto'
import { Menu } from './interfaces/menu.interface'
import { MenuService } from './menu.service'
import { MenuResponse } from './responses/menu.response'

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @ApiResponse({
        status: 200,
        type: [MenuResponse],
    })
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

    @UseGuards(RolesGuard)
    @Post('/')
    async create(@Body() menuDto: MenuDto): Promise<Menu> {
        return await this.menuService.create(menuDto)
    }
}
