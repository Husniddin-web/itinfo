const { model, Schema } = require("mongoose")


const topicSchema = new Schema({
    author_id: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    topic_title: { type: String, required: true, uppercase: true },
    topic_text: { type: String, required: true },
    is_checked: { type: Boolean, required: true },
    is_approved: { type: Boolean },
    expert_id: { type: Schema.Types.ObjectId, ref: "Author", required: true }
}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("Topic", topicSchema)