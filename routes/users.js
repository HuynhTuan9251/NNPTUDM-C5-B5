const express = require("express");
const router = express.Router();

const User = require("../schemas/User");


// CREATE USER
router.post("/", async (req, res) => {
  try {

    const user = new User(req.body);
    await user.save();

    res.status(201).json(user);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
});


// GET ALL USERS
router.get("/", async (req, res) => {
  try {

    const users = await User.find({
      isDeleted: false
    }).populate("role");

    res.json(users);

  } catch (error) {

    res.status(500).json(error);

  }
});


// GET USER BY ID
router.get("/:id", async (req, res) => {
  try {

    const user = await User.findOne({
      _id: req.params.id,
      isDeleted: false
    }).populate("role");

    if (!user) {
      return res.json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json(error);

  }
});


// UPDATE USER
router.put("/:id", async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(user);

  } catch (error) {

    res.status(400).json(error);

  }
});


// SOFT DELETE USER
router.delete("/:id", async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    res.json(user);

  } catch (error) {

    res.status(500).json(error);

  }
});


// ENABLE USER
router.post("/enable", async (req, res) => {
  try {

    const { email, username } = req.body;

    const user = await User.findOne({
      email,
      username
    });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    user.status = true;
    await user.save();

    res.json(user);

  } catch (error) {

    res.status(500).json(error);

  }
});


// DISABLE USER
router.post("/disable", async (req, res) => {
  try {

    const { email, username } = req.body;

    const user = await User.findOne({
      email,
      username
    });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    user.status = false;
    await user.save();

    res.json(user);

  } catch (error) {

    res.status(500).json(error);

  }
});


module.exports = router;