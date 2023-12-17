const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const db = require("../models");
const User = db.user;
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] 

  if (token == null || token == undefined || token == 'undefined') return res.status(401).send({
    status: false,
    message: 'Unauthorized'
});

  jwt.verify(token, config.secret , async (error , id ) => {
    console.log(error)

    if (error) return res.status(200).send({
      status:false,
      message:"Token is either invalid or missing!"
    })
    var authUser = await User.findOne({
      where:{
        id:id.id
      }
    })
    console.log(id.id +'=======id')
    // return ("id of current user "+ id.id)
    req.authUser = authUser;
    next()
  })
}

module.exports = authenticateToken;