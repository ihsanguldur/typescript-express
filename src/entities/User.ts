import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm"
import { Todo } from './Todo';
import {Base} from "./Base";

@Entity()
export class User extends Base{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false
    })
    email!: string;

    @Column({
        nullable: false
    })
    password!: string;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos!: Todo[];

}
