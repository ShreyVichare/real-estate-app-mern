import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Users" });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: id }, // or you can just write "id" instead of id:id
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Users" });
  }
};

export const updateUser = async (req, res) => {
  const { password, avatar, ...inputs } = req.body;
  const id = req.params.id;
  const tokenUserId = req.userId;
  if (!id === tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update User" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  if (!id === tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  try {
    await prisma.user.delete({
      where: { id: id },
    });

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete User" });
  }
};
