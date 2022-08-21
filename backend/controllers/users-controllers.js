const uuid = require("uuid/v4");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const { create, createIndexes } = require("../models/place");

DUMMY_USERS = [
  {
    id: "u1",
    name: "Deno Yilmaz",
    email: "deno@deno.com",
    password: "admin",
  },
];

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Fetching users failed, please try again", 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try with a different email.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: "https://xsgames.co/randomusers/assets/avatars/male/47.jpg",
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed.", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try with a different email.",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password != password) {
    const error = new HttpError("Invalid credentials", 401);
    return next(error);
  }
  res.json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
