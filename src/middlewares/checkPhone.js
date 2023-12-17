const db = require('../models')
const User = db.user;
const checkPhone = (req, res, next) => {
    const { phoneNo } = req.body;
    if (phoneNo) {

        User.findOne({
            where: {
                phoneNo: phoneNo
            }
        }).then((user) => {
            if (user) {
                res.status(500).send({
                    status: false,
                    message: "Phone number " + user.phoneNo + " already exists "
                })
            } else {
                next();
            }
        }).catch((error) => res.status(500).send({
            status: false,
            error
        }))
    } else {
        next();
    }
}

module.exports = checkPhone;