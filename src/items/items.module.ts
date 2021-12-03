import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from './enitity/item.entity'
import { ItemsController } from './items.controller'
import { ItemsService } from './items.service'
import { Menu } from 'src/menu/entity/menu.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Item, Menu])],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule {}
