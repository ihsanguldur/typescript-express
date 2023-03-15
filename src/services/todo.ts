import {Todo} from '../entities/Todo';
import AppDataSource from '../entities';
import {ITodoDto} from "../dtos/Todo";

export async function create(req: ITodoDto, userID: number) {
    try {
        const todo = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(Todo)
            .values({
                content: req.content,
                user: {
                    id: userID
                }
            })
            .returning(["content"])
            .execute();

        return todo.raw;
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function get(todoId: number, userId: number) {
    try {
        const todo = await AppDataSource
            .createQueryBuilder()
            .select("todo.content")
            .from(Todo, "todo")
            .where("todo.userId = :userId", {userId})
            .andWhere("todo.id = :id", {id: todoId})
            .getOne();

        return todo;
    } catch (e: any) {
        throw new Error(e);
    }
}