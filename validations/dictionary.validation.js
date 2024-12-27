const Joi = require("joi")


exports.dictionaryValidation = (data) => {

    const dictionarySchema = Joi.object({
        term: Joi.string().required().trim().min(4).max(100)
    })



    return dictionarySchema.validate(data, { abortEarly: false })
}