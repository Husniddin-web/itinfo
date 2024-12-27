const { model, Schema } = require("mongoose")


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    info: { type: String },
    photo: { type: String },
    is_active: { type: Boolean, default: false },
    activation_link: String,
    refresh_token: { type: String }
}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("User", userSchema)