import {User} from '../entities/User';
import AppDataSource from '../entities';
import {IUserDto} from "../dtos/User";

export async function register(req: IUserDto) {
    try {
        const user = await AppDataSource.createQueryBuilder()
            .insert()
            .into(User)
            .values({
                email: req.email,
                password: req.password
            })
            .returning(["email"])
            .execute();

        return user.raw;
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function login(req: IUserDto) {
    try {
        const user = await AppDataSource.createQueryBuilder()
            .select(["user.email", "user.password", "user.id"])
            .from(User, "user")
            .where("user.email = :email", {email: req.email})
            .andWhere("user.password = :password", {password: req.password})
            .getOne();

        return user;
    } catch (e: any) {
        throw new Error(e);
    }
}