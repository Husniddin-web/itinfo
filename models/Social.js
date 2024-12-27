const { model, Schema } = require("mongoose")


const socialSchema = new Schema({
    name: { type: String, required: true },
    icon_file: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
})



module.exports = model("Social", socialSchema)