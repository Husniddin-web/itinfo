const Joi = require("joi")


exports.categoryValidation = (data) => {
    const categorySchema = Joi.object({
        category_name: Joi.string()
            .min(7).message("Kategorya nomi uchta harfdan uzun bolish kerak")
            .max(50).message("Kategorya nomi 50 kop bolmasligi kerak")
            .required()
            .messages({
                "string.empty": "Kategory nomi bosh bolishi mumkin emas",
                "any.required": "Kategorya nomi kiritilish shart"
            }),
        parent_category_id: Joi.string()
            .alphanum().message("ID notogri")
    })
    return categorySchema.validate(data, { abortEarly: false })
}
