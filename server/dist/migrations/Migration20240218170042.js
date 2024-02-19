"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20240218170042 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20240218170042 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "post" ("id" serial primary key, "full_name" varchar(255) not null, "email" varchar(255) not null, "title" varchar(255) not null);');
        this.addSql('drop table if exists "test" cascade;');
    }
    async down() {
        this.addSql('create table "test" ("some_name" name not null, constraint "test_pkey" primary key ("some_name"));');
        this.addSql('drop table if exists "post" cascade;');
    }
}
exports.Migration20240218170042 = Migration20240218170042;
//# sourceMappingURL=Migration20240218170042.js.map