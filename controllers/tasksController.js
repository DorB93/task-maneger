const Task = require("./../models/taskModel");

exports.getUserTasks = async function (req, res, next) {
	try {
		const tasks = await Task.find({ user: req.user._id });

		res.status(200).json({
			status: "success",
			length: tasks.length,
			data: { tasks },
		});
	} catch (err) {
		next();
	}
};

exports.createTask = async function (req, res, next) {
	try {
		const task = await Task.create({
			...req.body,
			user: req.user._id,
			dueDate: new Date(`${req.body.dueDate}T00:00:00`),
		});
		res.status(201).json({
			status: "success",
			task,
		});
	} catch (error) {
		next(error);
	}
};
