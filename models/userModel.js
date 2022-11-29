require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please tell us your name!"],
		},

		email: {
			type: String,
			unique: true,
			required: [true, "Please provide your email!"],
			validate: [validator.isEmail, "Please provide a valid email!"],
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			// will not return the password to the client
			select: false,
		},
		role: {
			type: String,
			enum: ["user", "manager", "admin"],
			default: "user",
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

userSchema.virtual("reviews", {
	ref: "Task",
	foreignField: "user",
	localField: "_id",
	justOne: false,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
