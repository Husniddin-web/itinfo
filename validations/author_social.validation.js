const Joi = require("joi")


exports.authorSocialValidation = (data) => {

    const authorSocialSchema = Joi.object({
        social_id: Joi.string().required().alphanum(),
        author_id: Joi.string().required().alphanum(),
        social_link: Joi.string().required()

    })



    return authorSocialSchema.validate(data, { abortEarly: false })
}