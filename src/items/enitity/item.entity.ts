import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderItem } from '../../order-items/entity/order-item.entity'

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    image: string

    @Column()
    price: number

    @Column()
    menu: number

    @OneToMany(() => OrderItem, (item) => item.item)
    orderItems: OrderItem[]
}
