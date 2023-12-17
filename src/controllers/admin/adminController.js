const db = require("../../models");
const { hash: hashPassword, } = require("../../utils/password");
const User = db.user;
const Support = db.support;

var allUsers = (req, res) => {
  User.findAll({
  })
    .then((data) => {
      res.status(200).send({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).send({
        status: false,
        error,
      });
    });
};

var resetUserPassword = async (req, res) => {
  const { newPassword } = req.body;
  User.findOne({ where: { id: req.body.userId } })
    .then((user) => {
      if (user) {
        const hashedPassword = hashPassword(newPassword.trim());
        user
          .update({
            password: hashedPassword,
          })
          .then((updatedUser) => {
            updatedUser.password = undefined;
            res.status(200).send({
              status: true,
              message: "Password updated successfully!",
            });
          })
          .catch((error) => res.status(500).send({ status: false, error }));
      }
    })
    .catch((error) => res.status(500).send({ status: false, error }));
};

var supportMessages = (req, res) => {
  Support.findAll()
    .then((data) => {
      res.status(200).send({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "There may be no support messages",
        status: false,
        error,
      });
    });
};

module.exports = {
  allUsers,
  supportMessages,
  resetUserPassword,
};
