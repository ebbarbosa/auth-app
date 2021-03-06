//Validation
const joi = require('joi');

const registerValidation = data => {
    const schema = joi.object({
        name: joi.string().max(255).min(6).required(),
        email: joi.string().min(6).max(255).email().required(),
        password: joi.string().min(6).max(1024).required()
    });

    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().email().min(6).max(255).required(),
        password: joi.string().min(6).max(1024).required()
    });

    return schema.validate(data);
};

const postValidation = (data) => {
    const schema = joi.object({
        message: joi.string().min(6).max(12*1024).required()
    });

    return schema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;

