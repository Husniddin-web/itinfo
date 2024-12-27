const Joi = require("joi")

exports.UserValidation = (data) => {

    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).pattern(/^[a-zA-Z0-9&$!_]{3,30}$/),
        confirm_password: Joi.ref("password"),
        info: Joi.string().min(10),
        photo: Joi.string().default("//user/png"),
        is_active: Joi.boolean().default(false)
    })
    return userSchema.validate(data, { abortEarly: false })
}