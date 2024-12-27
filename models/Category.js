const { model, Schema } = require("mongoose")



const categorySchema = new Schema({
    category_name: { type: String, required: true, trim: true, uppercase: true },
    parent_category_id: { type: Schema.Types.ObjectId, ref: "Category" },
    descriptions: [{ type: Schema.Types.ObjectId, ref: "Description" }]
}, {
    timestamps: true,
    versionKey: false
})


module.exports = model("Category", categorySchema) 