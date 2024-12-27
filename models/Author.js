const { model, Schema } = require("mongoose")


const authorSchema = new Schema({
    first_name: { type: String, required: true, max: [30] },
    last_name: { type: String, required: true, max: [30], uppercase: true },
    nick_name: { type: String, required: true, max: [30], unique: true },
    email: { type: String, unique: true, required: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/] },
    phone: { type: String, required: true },
    password: { type: String, required: true, minLength: [6] },
    info: { type: String, uppercase: true },
    position: { type: String, required: true },
    photo: { type: String },
    is_expert: { type: Boolean, required: true },
    is_active: { type: Boolean, required: true },
    refresh_token: { type: String },
    activation_link: String
}, {
    versionKey: false,
    timestamps: true
})



module.exports = model("Author", authorSchema)