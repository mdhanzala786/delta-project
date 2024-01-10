const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../controllers/users.js");


router
.route("/signup")
.get(userControllers.signup)
.post(wrapAsync(userControllers.createUser));

router
.route("/login")
.get(userControllers.login)
.post(
saveRedirectUrl,
passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}),
wrapAsync(userControllers.reLogin));

router.get("/logout", userControllers.logout);


module.exports = router;