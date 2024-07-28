import { Element } from "src/element/entities/element.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    state:number;

    @Column({type: 'timestamp', nullable: true})
    start_time:Date;

    @Column({type: 'timestamp', nullable: true})
    end_time:Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at:Date;

    @ManyToMany(() => Element, element => element.records)
    @JoinTable()
    elements:Element[];

    @ManyToOne(() => User, user => user.records)
    @JoinColumn()
    user:User;
}
