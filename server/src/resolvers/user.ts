import { User, UserResponse, UserType } from "../entities/User";
import { MyContext } from "../types";
import { Arg, Ctx, Mutation } from "type-graphql";
import argon2 from 'argon2';

export class UserResolver {
    @Mutation(() => UserResponse) 
    async registerUser(
        @Arg("userdata") userdata : UserType,
        @Ctx() {em} : MyContext
    ) : Promise<UserResponse> {

        if(userdata.username.length < 2) {
            return {
                errors : [{
                    field : "username",
                    message : "Username length must be greater than 2"
                }]
            }
        }

        if(userdata.password.length < 5) {
            return {
                errors : [{
                    field : "password",
                    message : "Password length must be greater than 5"
                }]
            }
        }
        
        const hashedPassword = await argon2.hash(userdata.password)
        const user = em.create(User, { username : userdata.username, password : hashedPassword})
        try{
            await em.persistAndFlush(user);
        } catch(err) {
            // duplicate username error
            if(err.code === "23505") {
                return {
                    errors : [{
                        field : "username",
                        message : "Username already exists"
                    }]
                }
            }
        }
        return {user : user};
    }

    @Mutation(() => UserResponse) 
    async loginUser(
        @Arg("userdata") userdata : UserType,
        @Ctx() {em} : MyContext
    ) : Promise<UserResponse> {

        const user = await em.findOne(User, {username : userdata.username});
        if(!user){
            return {
                errors : [{
                    field : "username",
                    message : "Username does not exist"
                }]
            }
        }

        const hashedPassword = await argon2.verify(user.password, userdata.password);

        if(!hashedPassword) {
            return {
                errors : [{
                    field : "password",
                    message : "Incorrect password"
                }]
            }
        }
        return {
            user : user
        }
    }
}