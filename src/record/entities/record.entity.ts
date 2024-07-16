import { Element } from "src/element/entities/element.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    state:number;

    @Column({type: 'timestamp'})
    start_time:Date;

    @Column({type: 'timestamp'})
    end_time:Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at:Date;

    @OneToOne(() => Element)
    @JoinColumn()
    element:Element;
}
