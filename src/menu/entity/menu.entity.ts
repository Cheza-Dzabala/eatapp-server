import { Item } from 'src/items/enitity/item.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    image: string

    @OneToMany((type) => Item, (item) => item.menu, {
        eager: true,
    })
    items: Item[]
}
