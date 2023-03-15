import { object, string, TypeOf} from "zod";

export interface ITodoDto {
    content: string;
}

const payload = {
    body: object({
        content: string({
            required_error: "content required"
        })
    })
}

const params = {
    params: object({
        todoID: string({
            required_error: "todoID required"
        })
    })
}

export const createTodoDto = object({
    ...payload
});

export type CreateTodoDto = TypeOf<typeof createTodoDto>;

export const getTodoDto = object({
    ...params
});

export type GetTodoDto = TypeOf<typeof getTodoDto>;