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
   @Field(() => String, { nullable: true })
   fullName?: string | undefined;

   @Field(() => String, { nullable: true })
   email?: string | undefined;

   @Field(() => String, { nullable: true })
   title?: string | undefined;
}

