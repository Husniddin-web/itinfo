const Joi = require("joi")



exports.adminValidation = (data) => {
    const adminSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/).required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
        is_active: Joi.boolean().default(false),
        is_creator: Joi.boolean().default(false)
    })
    return adminSchema.validate(data, { abortEarly: false })
}