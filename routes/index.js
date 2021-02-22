var express = require("express");
var router = express.Router();

const userApi = require("./user.api");
router.use("/users", userApi);

const authApi = require("./auth.api");
router.use("/auth", authApi);

const vendorApi = require("./vendor.api");
router.use("/vendors", vendorApi);

const messageApi = require("./message.api");
router.use("/messages", messageApi);

module.exports = router;
