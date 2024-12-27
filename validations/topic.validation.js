const Joi = require("joi")


exports.topicValidation = (data) => {

    const topicSchema = Joi.object({
        author_id: Joi.string().alphanum(),
        expert_id: Joi.string().alphanum(),
        topic_title: Joi.string().required().min(5),
        topic_text: Joi.string().min(4),
        is_checked: Joi.boolean().default(false),
        is_approved: Joi.boolean().default(false),
    })

    return topicSchema.validate(data, { abortEarly: false })

}