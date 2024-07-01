import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("post route working..");
  console.log("router works");
});

export default router;
