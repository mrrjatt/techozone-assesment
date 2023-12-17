module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    phoneNo: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    country: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING
    },
    lastLoginDate: {
      type: DataTypes.DATE,
    },
    deviceToken: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      defaultValue:'user'
    }
  }, {
  });
  User.sync({}).then(() => {
    console.log("table users is created!!!")
  }).catch((error) => console.log(error))
  return User;
}