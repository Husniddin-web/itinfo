const Joi = require("joi")


exports.DescQuestionValidation = (data) => {

    const descqSchema = Joi.object({
        qu_id: Joi.string().required().alphanum(),
        desc_id: Joi.string().required().alphanum()
    })



    return descqSchema.validate(data, { abortEarly: false })
}