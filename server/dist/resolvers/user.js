"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
class UserResolver {
    async registerUser(userdata, { em, req }) {
        if (userdata.username.length < 2) {
            return {
                errors: [{
                        field: "username",
                        message: "Username length must be greater than 2"
                    }]
            };
        }
        if (userdata.password.length < 5) {
            return {
                errors: [{
                        field: "password",
                        message: "Password length must be greater than 5"
                    }]
            };
        }
        const hashedPassword = await argon2_1.default.hash(userdata.password);
        const user = em.create(User_1.User, { username: userdata.username, password: hashedPassword });
        try {
            await em.persistAndFlush(user);
        }
        catch (err) {
            if (err.code === "23505") {
                return {
                    errors: [{
                            field: "username",
                            message: "Username already exists"
                        }]
                };
            }
        }
        req.session.userId = user.id;
        return { user: user };
    }
    async me({ req, em }) {
        if (!req.session.userId) {
            return null;
        }
        const user = await em.findOne(User_1.User, { id: req.session.userId });
        return user;
    }
    async loginUser(userdata, { em, req }) {
        const user = await em.findOne(User_1.User, { username: userdata.username });
        if (!user) {
            return {
                errors: [{
                        field: "username",
                        message: "Username does not exist"
                    }]
            };
        }
        const hashedPassword = await argon2_1.default.verify(user.password, userdata.password);
        if (!hashedPassword) {
            return {
                errors: [{
                        field: "password",
                        message: "Incorrect password"
                    }]
            };
        }
        req.session.userId = user.id;
        return {
            user: user
        };
    }
}
exports.UserResolver = UserResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("userdata")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.UserType, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "registerUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("userdata")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.UserType, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "loginUser", null);
//# sourceMappingURL=user.js.map