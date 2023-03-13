import { object, number, string, TypeOf} from "zod";

const payload = {
    body: object({
        content: string({
            required_error: "content required"
        })
    })
}

const params = {
    params: object({
        userID: number({
            required_error: "userID required"
        })
    })
}

export const createTodoDto = object({
    ...payload,
    ... params
});

export type CreateTodoDto = Omit<TypeOf<typeof createTodoDto>, "params.userID">;