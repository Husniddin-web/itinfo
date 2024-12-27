const Joi = require("joi")


exports.socialValidation = (data) => {

    const socialSchema = Joi.object({
        name: Joi.string().required(),
        icon_file: Joi.string().default("/social/icon_file.png")

    })



    return socialSchema.validate(data, { abortEarly: false })
}