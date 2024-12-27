const Joi = require("joi")


exports.TagValidation = (data) => {

    const tagSchema = Joi.object({
        topic_id: Joi.string().required().alphanum(),
        category_id: Joi.string().required().alphanum()
    })



    return tagSchema.validate(data, { abortEarly: false })
}