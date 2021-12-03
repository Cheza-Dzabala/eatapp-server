import { Menu } from 'src/menu/entity/menu.entity'
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
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

    @ManyToOne((type) => Menu, (menu) => menu.id)
    menu: Menu

    @OneToMany(() => OrderItem, (item) => item.item)
    orderItems: OrderItem[]
}
