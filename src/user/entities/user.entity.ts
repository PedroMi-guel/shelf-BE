import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hashSync } from 'bcrypt';
import { Record } from "src/record/entities/record.entity";

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

    @Column({select: false})
    password:string;
    
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at:Date;

    @OneToMany(() => Record, record => record.user)
    records:Record[];

    @BeforeInsert()
    checkEmail(){
        this.email = this.email.toLowerCase().trim();

        this.password = hashSync(this.password.trim(), 10);
    }

    @BeforeUpdate()
    cryptPassword(){
        this.password = hashSync(this.password.trim(), 10);
    }
}
