const { model, Schema } = require("mongoose")



const desc_questionSchema = new Schema({
    qu_id: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    desc_id: { type: Schema.Types.ObjectId, ref: "Description", required: true }
}, {
    versionKey: false
})


module.exports = model("DescQuestion", desc_questionSchema)