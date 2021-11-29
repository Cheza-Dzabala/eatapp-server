import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Order } from 'src/order/entity/order.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    preferredName: string

    @Column()
    phoneNumber: string

    @OneToMany((type) => Order, (order) => order.user)
    orders: Order[]

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }
}
