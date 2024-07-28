import { Category } from "src/category/entities/category.entity";
import { Record } from "src/record/entities/record.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Element {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    image?: string;
    @ManyToOne(() => Category, category => category.elements)
    category: Category;
    @ManyToMany(() => Record, record => record.elements)
    records:Record[];
}
