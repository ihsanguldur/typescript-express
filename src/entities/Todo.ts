import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from "typeorm";
import { User } from './User';
import {Base} from "./Base";

@Entity()
export class Todo extends Base{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false
    })
    content!: string;

    @ManyToOne(() => User, (user) => user.todos)
    user!: User;
}