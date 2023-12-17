const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const authRoute = require('./routes/auth.route');
const generateSwaggerUiFile = require('./swagger/swagger');
generateSwaggerUiFile();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger-output.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

global.__basedir = path.resolve() + "/..";
console.log(path.resolve());
app.use(express.static(__dirname+'/uploads'));
app.use('/images', express.static('vehicles'));
app.use('/api/auth', authRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine",
        }
    });
});

module.exports = app;
