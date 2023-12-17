const db = require('../models')
const User = db.user;
const checkEmail = (req, res, next) => {
    const { email } = req.body;
    User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if (user) {
            res.status(200).send({
                status: false,
                message: "Email " + user.email + " already exists "
            })
        } else {
            next();
        }
    }).catch((error) => res.status(500).send({
        status: false,
        error
    }))


}

module.exports = checkEmail;