const db = require("../../models");
const {
    hash: hashPassword,
    compare: comparePassword,
} = require('../../utils/password')
const { generate: generateToken } = require('../../utils/token')
const User = db.user;
const Vehicle = db.vehicle;
const Category = db.category;
var signup = (req, res) => {
    const { password } = req.body;
    const hashedPassword = hashPassword(password.trim())
    req.body.password = hashedPassword;
    User.create(req.body).then((user) => {
        User.findOne({
            where: {
                id: user.id
            }
        }).then((data) => {
            const token = generateToken(data.id)
            user.password = undefined;
            res.status(200).send({
                status: true,
                token: token,
                data,
            })
        }).catch((error) => {
            res.status(500).send({
                status: false,
                message: "Registraton Failed",
                error
            })
        })
    }).catch((error) => {
        res.status(500).send({
            status: false,
            message: "Registraton Failed",
            error
        })
    })

}
var signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({
        where: {
            email: email
        },
    }).then((user) => {
        if (user) {
            user.update({
                last_login_date: new Date(),
                deviceToken: req.body?.deviceToken
            }).then((user) => {
                if (comparePassword(password.trim(), user.password)) {
                    user.password = undefined;
                    const token = generateToken(user.id)
                    if (user.status) {
                        res.status(200).send({
                            status: true,
                            token: token,
                            user
                        })
                    } else {
                        res.status(200).send({
                            status: false,
                            message: "Your account has been suspended please contact support to get this resolved!"
                        })
                    }
                } else {
                    res.status(200).send({
                        status: false,
                        message: "password is incorrect"
                    })
                }
            }).catch((error) => {
                res.status(500).send({
                    status: false,
                    error
                })
            })
        } else {
            res.status(200).send({
                status: false,
                message: "Email does not exist!"

            })
        }
    }).catch((error) => {
        res.status(500).send({
            status: false,
            error
        })
    })

}
var getUser = (req, res) => {
    User.findOne({ where: { id: req.body.id } }).then((user) => {
        user.password = undefined;
        res.status(200).send({
            status: true,
            user
        })
    }).catch(error => res.status(500).send({ status: false, error: error }))
}

var updateUser = (req, res) => {
    User.findOne({ where: { id: req.authUser.id } }).then((user) => {
        if (user) {
            user.update(req.body).then((data) => {
                data.password = undefined;
                res.status(200).send({
                    status: true,
                    data
                })
            }).catch(error => res.status(500).send({ status: false, error }))
        }
    }).catch(error => res.status(500).send({ status: false, error }))
}

var getHomeData = async (req, res) => {
    try {
        var allVehicles = await Vehicle.findAll();
        var thirtMinutesOffers = await Vehicle.findAll(
            {
                where: {
                    time: '30 minutes'
                }
            }
        );
        var oneHourOffers = await Vehicle.findAll(
            {
                where: {
                    time: '1 hour'
                }
            }
        );
        var twoHourOffers = await Vehicle.findAll(
            {
                where: {
                    time: '2 hours'
                }
            }
        );
        var categoryViseData = await Category.findAll(
            {
                include: [
                    {
                        model: Vehicle
                    }
                ]
            }
        );
        res.status(200).send({
            status:true,
            allVehicles,
            thirtMinutesOffers,
            oneHourOffers,
            twoHourOffers,
            categoryViseData
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            error
        })
    }
}

module.exports = {
    signup,
    signin,
    updateUser,
    getUser,
    getHomeData
}