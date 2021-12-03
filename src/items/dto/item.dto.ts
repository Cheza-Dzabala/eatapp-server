import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ItemDto {
    @ApiProperty({
        description: 'Item name',
    })
    @IsNotEmpty()
    name: string
    @ApiProperty({
        description: 'Item description',
    })
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description: 'Image of the item being ordered',
    })
    @IsNotEmpty()
    image: string

    @ApiProperty({
        description: 'Price of the item being ordered',
    })
    @IsNotEmpty()
    price: number

    @ApiProperty({
        description: 'The menuId of the item being ordered',
    })
    @IsNotEmpty()
    menu: number
}
