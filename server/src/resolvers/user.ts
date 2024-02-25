import { User, UserResponse, UserType } from "../entities/User";
import { MyContext } from "../types";
import { Arg, Ctx, Mutation, Query } from "type-graphql";
import argon2 from 'argon2';

export class UserResolver {
    @Mutation(() => UserResponse) 
    async registerUser(
        @Arg("userdata") userdata : UserType,
        @Ctx() {em, req} : MyContext
    ) : Promise<UserResponse> {       // we are expecting a promise of UserResponse not user because we are returning an object with user and error message

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
        // we are hashing the password
        const hashedPassword = await argon2.hash(userdata.password)

        // then adding the user to the database
        const user = em.create(User, { username : userdata.username, password : hashedPassword})
        try{
            await em.persistAndFlush(user);
        } catch(err) {
            // duplicate username error
            if(err.code === "23505") {     // 23505 is the error code for duplicate username, coming from DB
                return {
                    errors : [{
                        field : "username",
                        message : "Username already exists"
                    }]
                }
            }
        }

        req.session.userId = user.id;   // setting the session id to the user id, for cookies

        return {user : user};
    }

    @Query(() => User, {nullable : true})
    async me(
        @Ctx() {req,em} : MyContext
    ) : Promise<User | null> {
        if(!req.session.userId) {
            return null;
        }
        const user = await em.findOne(User, {id : req.session.userId});   // reads the cookie and finds the user
        return user;
    }

    @Mutation(() => UserResponse) 
    async loginUser(
        @Arg("userdata") userdata : UserType,
        @Ctx() {em, req} : MyContext
    ) : Promise<UserResponse> {
        // finding the user, based on the username
        const user = await em.findOne(User, {username : userdata.username});
        if(!user){
            return {
                errors : [{
                    field : "username",                                 // validating if the username exists
                    message : "Username does not exist"
                }]
            }
        }
        // we are verifying the password
        const hashedPassword = await argon2.verify(user.password, userdata.password);

        if(!hashedPassword) {
            return {
                errors : [{
                    field : "password",                                 // validating if the password is correct
                    message : "Incorrect password"
                }]
            }
        }
        req.session.userId = user.id;  // setting the session id to the user id, for cookies

        return {
            user : user
        }
    }
}