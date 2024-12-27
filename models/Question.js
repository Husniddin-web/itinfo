const { model, Schema } = require("mongoose")


const questionSchema = new Schema({
    question: { type: String, required: true, max: [100] },
    answer: { type: String, required: true, max: [150] },
    is_checked: { type: Boolean },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expert_id: { type: Schema.Types.ObjectId, ref: "Author" }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model("Question", questionSchema)
