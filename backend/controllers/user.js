const User = require("../models/User");
const CustomAPIError = require("../errors");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    if (!user.email || !user.password) {
      throw new CustomAPIError("Email or password missing", 400);
    }
    if (!emailRegex.test(user.email)) {
      throw new CustomAPIError("Email format invalid", 400);
    }
    if (await User.findOne({ email: user.email })) {
      throw new CustomAPIError("Email already exists", 409);
    }
    // TODO: encrypt password
    await user.save();
    res.json({ email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    if (!userEmail) {
      throw new CustomAPIError("Email missing", 400);
    }
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new CustomAPIError("Email not found", 400);
    }
    // TODO: send email
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  updatePassword,
};
