const express = require("express");
const router = express.Router();
const { signIn, signUp, updateUser, deleteUser, getUsers} = require("../controller/user");

//obsługa przychodzących rządań
router.get("/", getUsers);
router.post("/signup", signUp);
router.post("/login", signIn);
router.patch("/:userID", updateUser);
router.delete("/:userID", deleteUser);
module.exports = router;
