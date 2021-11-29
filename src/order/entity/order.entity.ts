import { OrderItem } from 'src/order-items/entity/order-item.entity'
import { User } from 'src/users/entity/user.entity'
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne((type) => User, (user) => user.orders, {
        eager: true,
    })
    user: User

    @Column()
    status: string

    @Column()
    createdAt: Date

    @OneToMany(() => OrderItem, (item) => item.order, {
        eager: true,
    })
    items: OrderItem[]
}
