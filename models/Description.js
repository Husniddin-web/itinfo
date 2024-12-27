const { model, Schema } = require("mongoose")


const descriptionSchema = new Schema({
    category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    description: { type: String, uppercase: true }
}, {
    timestamps: true,
    versionKey: false
}
)


module.exports = model("Description", descriptionSchema)