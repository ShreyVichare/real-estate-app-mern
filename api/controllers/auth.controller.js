import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  //hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  //create a new user annd save to DB
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  console.log(newUser);
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
