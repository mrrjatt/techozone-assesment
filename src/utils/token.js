const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
// const { logger } = require('./logger');

const generate = (id) => jwt.sign({ id }, config.secret, { expiresIn: '1d'});

const decode = (token) => {
    try {
        return jwt.verify(token, config.secret)
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    generate,
    decode
}