const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");
const findOrCreate = require("mongoose-findorcreate");
const { BadRequestError } = require("../errors");

const { secret } = require("../config");

const { Schema } = mongoose;

const UserSchema = Schema({
    username: {
        type: String,
        unique: true,
        validate: /^\S*$/,
        minLength: 3,
        maxLength: 50,
        trim: true,
        sparse: true,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    lists: [{ type: Schema.Types.ObjectId, ref: "TodoList" }],
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

UserSchema.plugin(passportLocalMongoose, {
    limitAttempts: true,
    maxAttempts: 20,
});
UserSchema.plugin(uniqueValidator);
UserSchema.plugin(findOrCreate);

UserSchema.pre("validate", async function () {
    if (!this.username && !this.googleId) {
        throw new BadRequestError("username is required");
    }
});

UserSchema.pre("remove", async function () {
    await this.model("TodoList").find({ user: this._id }).remove().exec();
    await this.model("Todo").find({ user: this._id }).remove().exec();
});

UserSchema.methods.generateJwt = function () {
    return jwt.sign({ id: this._id, username: this.username }, secret, {
        expiresIn: "120d",
    });
};

UserSchema.methods.toJson = function () {
    return {
        id: this._id,
        username: this.username,
    };
};

UserSchema.methods.toAuthJson = function () {
    return {
        id: this._id,
        username: this.username,
        jwt: this.generateJwt(),
    };
};

mongoose.model("User", UserSchema);
