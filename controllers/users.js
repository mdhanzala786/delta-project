const User = require("../model/user");

module.exports.signup = (req, res) => {
    res.render("user/signup.ejs");
};

module.exports.login = (req, res) => {
    res.render("user/login.ejs");
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "logged you out!");
        res.redirect("/listings");
    })
};

module.exports.createUser = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "welcome to wanderlust!")
            res.redirect("/listings");
        });
    }catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.reLogin = async(req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};