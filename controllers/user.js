import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import key from "../config/keys";
const { JWT_SECRET } = key;

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "please add all the fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ error: "user already exists with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await new User({
      email,
      password: hashedPassword,
    }).save();
    res.status(200).json({ message: "signup success you can login now" });
  } catch (err) {
    console.log("err", err);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "please add all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "user does not exist with this email" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.status(201).json({ token });
    } else {
      return res.status(401).json({ error: "email or password is invalid" });
    }
  } catch (err) {
    console.log(err);
  }
};
