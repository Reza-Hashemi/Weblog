async function adminAccess(req, res, next) {
    if(req.session.user.role !== "admin"){
        return res.status(403).json("access denied")
    }
    next()
}

module.exports = {adminAccess};
