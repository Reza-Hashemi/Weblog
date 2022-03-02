async function adminAccess(req, res, next) {
    if(req.session.user.role !== "admin"){
        return res.render("error")
    }
    next()
}

module.exports = adminAccess;
