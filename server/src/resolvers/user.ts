import { User, UserType } from "../entities/User";
import { MyContext } from "../types";
import { Arg, Ctx, Mutation } from "type-graphql";
import argon2 from 'argon2';

export class UserResolver {
    @Mutation(() => User) 
    async registerUser(
        @Arg("userdata") userdata : UserType,
        @Ctx() {em} : MyContext
    ) : Promise<User> {
        
        const hashedPassword = await argon2.hash(userdata.password)
        const user = em.create(User, { username : userdata.username, password : hashedPassword})
        await em.persistAndFlush(user);
        return user;
    }
}