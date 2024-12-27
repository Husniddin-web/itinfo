const { model, Schema } = require('mongoose')


const DictionarySchema = new Schema({
    term: { type: String, uppercase: true, required: true, trim: true, unique: true },
    letter: { type: String, uppercase: true }
}, {
    timestamps: true, versionKey: false
})




module.exports = model("Dictionary", DictionarySchema)