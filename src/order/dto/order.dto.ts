import { IsNotEmpty } from 'class-validator'
import { OrderItemsDto } from 'src/items/dto/order-items.dto'

export class OrderDto {
    id: string
    @IsNotEmpty() userId: number
    createdAt: Date
    @IsNotEmpty() items: OrderItemsDto[]
}
