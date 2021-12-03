import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ItemDto } from './dto/item.dto'
import { ItemsService } from './items.service'
import { ApiTags } from '@nestjs/swagger'
import { Item } from './enitity/item.entity'

@ApiTags('Items')
@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post('/')
    async create(@Body() itemDto: ItemDto): Promise<Item> {
        return await this.itemsService.create(itemDto)
    }
}
