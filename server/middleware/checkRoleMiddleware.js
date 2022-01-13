const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                res.status(401).json({message: 'User not logged in'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: 'You don\'t have access'})
            }
            req.user = decoded
            next()
        } catch (err) {
            res.status(401).json({message: 'User not logged in'})
        }
    }

}






