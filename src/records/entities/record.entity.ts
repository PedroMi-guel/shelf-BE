import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    state:number; 
    
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    request_time:Date;
    
    @Column({type: 'timestamp'})
    start_time:Date;

    @Column({type: 'timestamp'})
    end_time:Date;
}
