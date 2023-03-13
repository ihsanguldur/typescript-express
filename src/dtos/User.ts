import {object, string, date, TypeOf} from "zod";

const payload = {
    body: object({
        email: string({
            required_error: "email required"
        }).email("email is not valid"),

        password: string({
            required_error: "password required"
        }).min(6, "password too short")
    })
}

export const createUserDto = object({
    ...payload
});

export type CreateUserDto = Omit<TypeOf<typeof createUserDto>, "body.password">;