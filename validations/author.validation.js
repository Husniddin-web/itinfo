const Joi = require("joi")

const authorFullName = (parent) => {
    return parent.first_name + " " + parent.last_name
}


exports.authorValidation = (data) => {
    const authorSchema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string(),
        full_name: Joi.string().default(authorFullName),
        nick_name: Joi.string().min(2).max(20),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        confirm_password: Joi.ref("password"),
        email: Joi.string().email().lowercase(),
        phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/), // 93-234-34-56
        position: Joi.string(),
        info: Joi.string(),
        photo: Joi.string().default("/author/avatar.png"),
        is_expert: Joi.boolean().default(false),
        is_active: Joi.boolean().default(false)
    })
    return authorSchema.validate(data, { abortEarly: false })
}