"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20240221171116 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20240221171116 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" date not null, "updated_at" date not null, "username" text not null, "password" text not null);');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    }
    async down() {
        this.addSql('drop table if exists "user" cascade;');
    }
}
exports.Migration20240221171116 = Migration20240221171116;
//# sourceMappingURL=Migration20240221171116.js.map