module.exports = (sequelize, DataTypes) => {
  const ForGotPassword = sequelize.define('forGotPassword', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {

  });
  ForGotPassword.sync().then(() => {
    console.log("table Forgot password is created!!!")
  }).catch((error) => console.log(error))
  return ForGotPassword;
}