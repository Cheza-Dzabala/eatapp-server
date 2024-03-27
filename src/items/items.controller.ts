import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ItemDto } from './dto/item.dto'
import { Item } from './enitity/item.entity'
import { ItemsService } from './items.service'

@ApiTags('Items')
@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post('/')
    async create(@Body() itemDto: ItemDto): Promise<Item> {
        return await this.itemsService.create(itemDto)
    }
}
