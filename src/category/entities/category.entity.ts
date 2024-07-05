import { Element } from "src/element/entities/element.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    image?: string;
    @OneToMany(() => Element, element => element.category_id)
    elements: Element[];
}
