
const validatorHandler = (req, res, next, schema) => {
    const { error } = schema.validate(req.body);

    if (error) {
       res.status(500).json({
            status: 'false',
            message: error.details[0].message.replace('/[^a-zA-Z0-9 ]/g', '')
        });
        return;
    }
    next();
};

module.exports = validatorHandler;