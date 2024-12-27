
const Joi = require("joi")



exports.descriptionValidation = (data) => {

    const desctiptionSchema = Joi.object({

        category_id: Joi.string().required().alphanum(),
        description: Joi.string().required().min(5)


    })



    return desctiptionSchema.validate(data, { abortEarly: false })

}