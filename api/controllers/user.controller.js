export const getUsers = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Users" });
  }
};
