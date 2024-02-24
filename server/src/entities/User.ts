import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
   @Field()
   @PrimaryKey()
   id!: number;

   @Field(() => String)
   @Property({type : 'date'})
   createdAt?: Date = new Date();

   @Field(() => String)
   @Property({type : 'date', onUpdate : () => new Date()})
   updatedAt?: Date = new Date();

   @Field()
   @Property({type : 'text', unique : true})
    username!: string;
   
   @Property({type : 'text'})
    password!: string;

}

@InputType()
export class UserType implements Partial<User> {
    @Field(() => String)
    username!: string;
    
    @Field(() => String)
    password!: string;
}

@ObjectType()
export class FieldError {
    @Field(() => String, {nullable : true})
    field ?: string
    @Field(() =>String, {nullable : true})
    message ?: string
}


@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], {nullable : true})
    errors?: FieldError[];
    @Field(() => User, {nullable : true})
    user?: User;
}