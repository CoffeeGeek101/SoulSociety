import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Post {

   @PrimaryKey()
   id!: number;

   @Property()
   fullName!: string;

   @Property()
   email!: string;

   @Property()
   title!: string;

}