import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class OrderItemsDto {
    @ApiProperty({
        description: 'id of the order item',
    })
    @IsNotEmpty()
    id: number

    @ApiProperty({
        description: 'id of the order',
    })
    @IsNotEmpty()
    order: number

    @ApiProperty({
        description: 'id of the product',
    })
    @IsNotEmpty()
    item: number

    @ApiProperty({
        description: 'quantity of the product',
    })
    @IsNotEmpty()
    quantity: number
}
