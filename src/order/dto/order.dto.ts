import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { OrderItemsDto } from 'src/items/dto/order-items.dto'

export class OrderDto {
    @ApiProperty()
    id: string

    @ApiProperty({
        description: 'The user who placed the order',
    })
    @IsNotEmpty()
    userId: number
    createdAt: Date

    @ApiProperty({
        description: 'An array of the items being ordered',
        type: [OrderItemsDto],
    })
    @IsNotEmpty()
    items: OrderItemsDto[]
}
