import {object, string, TypeOf} from "zod";

export interface IUserDto {
    email: string;
    password: string;
}

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

export const userDto = object({
    ...payload
});

export type UserDto = Omit<TypeOf<typeof userDto>, "body.password">;