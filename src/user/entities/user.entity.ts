import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hashSync } from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    name:string;

    @Column()
    lastName:string;

    @Column('text')
    password:string;
    
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at:Date;

    @BeforeInsert()
    checkEmail(){
        this.email = this.email.toLowerCase().trim();

        this.password = hashSync(this.password.trim(), 10);
    }
}
