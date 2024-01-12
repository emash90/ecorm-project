
// const verifyLoggedInUser = (req, res, next) => {
//     console.log("req.session", req.session);

//     if (req.session.user) {
//         console.log("user is logged in", req.session.user);
//         next();
//     } else {
//         res.status(401).send("Unauthorized");
//     }
// }


// module.exports = { verifyLoggedInUser }