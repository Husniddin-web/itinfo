const { model, Schema } = require("mongoose")


const synonmSchema = new Schema({
    desc_id: { type: Schema.Types.ObjectId, ref: "Description", required: true },
    dict_id: { type: Schema.Types.ObjectId, ref: "Dictionary", required: true }

}, {
    timestamps: true,
    versionKey: false
})



module.exports = model("Synonm", synonmSchema)