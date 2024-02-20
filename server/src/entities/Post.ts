import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
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

@InputType()
export class PostType implements Partial<Post> {
   @Field()
   fullName?: string;

   @Field()
   email?: string;

   @Field()
   title?: string;
}

