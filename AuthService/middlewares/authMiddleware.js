
const verifyLoggedInUser = (req, res, next) => {
    if (req.session.user) {
        console.log("user is logged in", req.session.user);
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}