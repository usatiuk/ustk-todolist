const mongoose = require("mongoose");

const { Schema } = mongoose;

const TodoSchema = Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300,
        trim: true,
    },
    list: { type: Schema.Types.ObjectId, ref: "TodoList", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    completed: { type: Boolean, default: false },
});

TodoSchema.pre("save", async function () {
    if (this.isNew) {
        const user = await this.model("User").findById(this.user);
        user.todos.push(this._id);
        await user.save();

        const list = await this.model("TodoList").findById(this.list);
        list.todos.push(this._id);
        await list.save();
    }
});

TodoSchema.pre("remove", async function () {
    const user = await this.model("User").findById(this.user);
    user.todos.splice(user.todos.indexOf(this._id), 1);
    await user.save();

    const list = await this.model("TodoList").findById(this.list);
    list.todos.splice(list.todos.indexOf(this._id), 1);
    await list.save();
});

TodoSchema.methods.toJson = function () {
    return {
        id: this._id.toString(),
        text: this.text,
        list: this.list.toString(),
        user: this.user.toString(),
        completed: this.completed,
    };
};

mongoose.model("Todo", TodoSchema);
