import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, InputType, ObjectType } from 'type-graphql';

// ObjectType is used to expose the table column as a object
@ObjectType()
@Entity() // This is a decorator, it tells the ORM that this is a table
export class Post {
   @Field()
   @PrimaryKey()
   id!: number;

   @Field()
   @Property()
   fullName?: string;

   @Field()
   @Property()
   email?: string;

   @Field()
   @Property()
   title?: string;
}

//InputType is used to pass the table column as a object rather than passing them as individual parameters
// InputType is used to pass the data into the resolver
@InputType()
export class PostType implements Partial<Post> {
   @Field(() => String, { nullable: true })
   fullName?: string | undefined;

   @Field(() => String, { nullable: true })      // we have to make the fields nullable because we are not passing all the fields, user might want to update only one field
   email?: string | undefined;                  // means the user can pass only the email or the title or both

   @Field(() => String, { nullable: true })
   title?: string | undefined;
}

