module.exports = (req, res, next) => {
    if (req.session.admin) {
        next()
    } else {
        res.send('login First Please')
    }
}
