const Joi = require("joi")

exports.QuestionValidation = (data) => {

    const questionSchema = Joi.object({
        question: Joi.string().required().max(100),
        answer: Joi.string().max(150).required(),
        is_checked: Joi.boolean().default(false),
        user_id: Joi.string().alphanum(),
        expert_id: Joi.string().alphanum()
    })

    return questionSchema.validate(data, { abortEarly: false })
}