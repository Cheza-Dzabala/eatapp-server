import { OrderItem } from 'src/order-items/entity/order-item.entity'
import { User } from 'src/users/entity/user.entity'

export interface Order {
    id: number
    user: User
    status: string
    createdAt: Date
    items: OrderItem[]
}
