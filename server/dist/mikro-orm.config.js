"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constant_1 = require("./constant");
const Post_1 = require("./entities/Post");
const postgresql_1 = require("@mikro-orm/postgresql");
const migrations_1 = require("@mikro-orm/migrations");
const User_1 = require("./entities/User");
exports.default = (0, postgresql_1.defineConfig)({
    extensions: [migrations_1.Migrator],
    entities: [Post_1.Post, User_1.User],
    dbName: constant_1.db_name,
    debug: (!constant_1.__prod__),
    password: constant_1.db_password,
    allowGlobalContext: true,
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
});
//# sourceMappingURL=mikro-orm.config.js.map