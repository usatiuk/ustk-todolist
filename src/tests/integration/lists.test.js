const request = require("supertest");
const mongoose = require("mongoose");

require("../../models/Todo");
require("../../models/TodoList");
require("../../models/User");

const Todo = mongoose.model("Todo");
const TodoList = mongoose.model("TodoList");
const User = mongoose.model("User");

jest.setTimeout(60000);
const MongoDBMemoryServer = require("mongodb-memory-server").default;
const server = require("../../app.js");
const { seed, clean, mongodbMemoryServerConfig } = require("./utils");

let user;
let token;
let list;
let todo;
let mongoServer;

beforeAll(async () => {
    mongoServer = new MongoDBMemoryServer(mongodbMemoryServerConfig);
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    ({ user, token, list, todo } = await seed());
});

afterEach(async () => {
    await clean();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("test lists", () => {
    test("should index lists", async () => {
        const response = await request(server)
            .get("/__/lists")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8");
        expect(response.body.success).toBeTruthy();
        expect(response.body.data[0].name).toEqual("List1");
    });
    test("should not index lists without authentication", async () => {
        await request(server)
            .get("/__/lists")
            .set("Accept", "application/json")
            .expect(401);
    });
    test("should create list", async () => {
        const response = await request(server)
            .post("/__/lists")
            .send({
                name: "List2",
            })
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8");
        expect(response.body.success).toBeTruthy();
        expect(await TodoList.findOne({ name: "List2" })).toBeTruthy();
        const freshUser = await User.findById(user.id).exec();
        expect(freshUser.lists.map((l) => String(l))).toContain(
            response.body.data.id,
        );
    });
    test("should create list with custom id", async () => {
        const id = mongoose.Types.ObjectId();
        const response = await request(server)
            .post("/__/lists")
            .send({
                name: "List2",
                id,
            })
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8");
        expect(response.body.success).toBeTruthy();
        expect(await TodoList.findOne({ name: "List2", _id: id })).toBeTruthy();
        const freshUser = await User.findById(user.id).exec();
        expect(freshUser.lists.map((l) => String(l))).toContain(
            response.body.data.id,
        );
    });

    test("should not create list without authentication", async () => {
        await request(server)
            .post("/__/lists")
            .send({
                name: "List2",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(401);
    });
    test("should update list", async () => {
        const response = await request(server)
            .patch(`/__/lists/${list._id}`)
            .send({
                name: "List2",
            })
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8");
        expect(response.body.success).toBeTruthy();
        expect(await TodoList.findOne({ name: "List2" })).toBeTruthy();
    });
    test("should not update list without authentication", async () => {
        await request(server)
            .patch(`/__/lists/${list._id}`)
            .send({
                name: "List2",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(401);
        expect(await TodoList.findOne({ name: "List2" })).toBeFalsy();
    });
    test("should remove list", async () => {
        const response = await request(server)
            .delete(`/__/lists/${list._id}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8");
        expect(response.body.success).toBeTruthy();
        expect(await TodoList.findOne({ name: "List1" }).exec()).toBeFalsy();
        expect(await Todo.findOne({ text: "Todo1" }).exec()).toBeFalsy();
        const freshUser = await User.findById(user.id).exec();
        expect(freshUser.lists).not.toContain(list._id);
        expect(freshUser.todos).not.toContain(todo._id);
    });
    test("should not remove list without authentication", async () => {
        await request(server)
            .delete(`/__/lists/${list._id}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(401);
        expect(await TodoList.findOne({ name: "List1" }).exec()).toBeTruthy();
        expect(await Todo.findOne({ text: "Todo1" }).exec()).toBeTruthy();
        const freshUser = await User.findById(user.id).exec();
        expect(freshUser.lists.map((l) => String(l))).toContain(
            String(list._id),
        );
        expect(freshUser.todos.map((t) => String(t))).toContain(
            String(todo._id),
        );
    });
});
