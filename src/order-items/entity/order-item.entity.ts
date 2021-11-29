import { Item } from 'src/items/enitity/item.entity'
import { Order } from 'src/order/entity/order.entity'
import {
    Column,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @ManyToOne((type) => Item, (item) => item.orderItems, {
        eager: true,
    })
    item: Item

    @ManyToOne((type) => Order, (order) => order.items)
    order: Order
}
