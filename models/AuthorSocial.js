const { model, Schema } = require("mongoose")



const authorSocial = new Schema({
    social_id: { type: Schema.Types.ObjectId, ref: "Social", required: true },
    author_id: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    social_link: { type: String, required: true, unique: true }

}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("AuthorSocial", authorSocial)
