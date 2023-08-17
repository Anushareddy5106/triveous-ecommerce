import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).send({ msg: "user already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = new User({ name, email, password: hashPassword, role });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).send({ msg: "User successfully signed up", token: token });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "something went wrong try again" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ msg: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(200).send({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).send({ msg: "User logged in successfully", token: token });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "something went wrong try again" });
  }
};
