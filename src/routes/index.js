const express = require("express");
const router = express.Router()
const usersRouter = require("./user");
const memberRouter = require("./member");
router
    .use("/users", usersRouter)
    .use("/members", memberRouter);

module.exports = router;
