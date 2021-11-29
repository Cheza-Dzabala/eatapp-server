import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ItemDto } from './dto/item.dto'
import { Item } from './interface/items.interface'
import { ItemsService } from './items.service'

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get(':id')
    async find(@Param('id') id: string): Promise<Item[]> {
        return this.itemsService.find(parseInt(id))
    }

    @Post('/')
    async create(@Body() itemDto: ItemDto): Promise<Item> {
        return await this.itemsService.create(itemDto)
    }
}
