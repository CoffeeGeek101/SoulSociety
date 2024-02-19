import { Migration } from '@mikro-orm/migrations';

export class Migration20240218170042 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "full_name" varchar(255) not null, "email" varchar(255) not null, "title" varchar(255) not null);');

    this.addSql('drop table if exists "test" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "test" ("some_name" name not null, constraint "test_pkey" primary key ("some_name"));');

    this.addSql('drop table if exists "post" cascade;');
  }

}
