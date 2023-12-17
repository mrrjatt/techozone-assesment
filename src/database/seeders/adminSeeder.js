const {
    hash: hashPassword,
  } = require('../../utils/password');
const db = require('../../models');
const User = db.user;

(async () => {    
    const hashedPassword = hashPassword("admin123")
    try {
        await User.create({
            email:'amdin@gmail.com',
            password:hashedPassword,
            firstName:'admin',
            role:'admin'
        })
        console.log('admin seeded successfull!')
    } catch (error) {
        console.log(error)
    }
    User.create
    
 })();