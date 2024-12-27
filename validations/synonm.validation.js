const Joi = require("joi")


exports.synonmValidation = (data) => {

    const synonmSchema = Joi.object({
        desc_id: Joi.string().required().alphanum(),
        dict_id: Joi.string().required().alphanum()
    })



    return synonmSchema.validate(data, { abortEarly: false })
}