const { model, Schema } = require("mongoose")



const adminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, min: [4] },
    is_active: { type: Boolean },
    is_creator: { type: Boolean },
    refresh_token: { type: String }

}, {
    versionKey: false,
    timestamps: true
})

module.exports = model("Admin", adminSchema)