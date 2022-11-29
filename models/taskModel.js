const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: [true, "Please provide the todo text!"],
		},
		dueDate: {
			type: Date,
			required: [true, "Please provide the do date!"],
		},
		createAt: {
			type: Date,
			default: new Date(),
		},
		completed: {
			type: Boolean,
			default: false,
		},
		active: {
			type: Boolean,
			default: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "Task must belong to a user."],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

taskSchema.index({ user: 1 });
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
