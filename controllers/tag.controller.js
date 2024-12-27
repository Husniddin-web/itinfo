const { default: mongoose } = require("mongoose")
const { errorHandler } = require("../helpers/error_handler")
const { TagValidation } = require("../validations/tag.validation")
const Topics = require("../models/Topics")
const Category = require('../models/Category')
const Tag = require("../models/Tag")

const addTag = async (req, res) => {
    try {
        const { error, value } = TagValidation(req.body)

        if (error) {
            return errorHandler(error, res)
        }
        const { topic_id, category_id } = value

        if (!mongoose.isValidObjectId(topic_id) && !mongoose.isValidObjectId(category_id)) {
            return errorHandler({ message: "Id is not valid" })
        }

        const topic = await Topics.findById(topic_id)


        if (!topic) {

            return errorHandler({ message: "topic id not found" }, res)
        }

        const category = await Category.findById(category_id)

        if (!category) {
            return errorHandler({ message: "category id not found" }, res)
        }

        const tag = await Tag.create(value)

        res.status(201).send({ message: "Ceated succefully", tag })




    } catch (error) {

        errorHandler(error, res)

    }
}



const getAllTag = async (req, res) => {
    try {

        const terms = await Tag.find({}).populate("topic_id").populate("category_id")
        res.status(200).send(terms)

    } catch (error) {

        errorHandler(error, res)

    }
}




const updateTagById = async (req, res) => {

    try {

        const { id } = req.params

        const value = req.body

        if (!mongoose.isValidObjectId(id)) {

            return res.status(400).send({ message: "Invalid id " })

        }
        if (value.topic_id) {


            const topic = await Topics.findById(value.topic_id)


            if (!topic) {
                return errorHandler({ message: "topic id not found" }, res)
            }

        }

        if (value.category_id) {


            const category = await Category.findById(value.category_id)
            console.log(category)
            if (!category) {
                return errorHandler({ message: "category id not found" }, res)
            }

        }


        const term = await Tag.findByIdAndUpdate(id, { value })

        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully updated", term })

    } catch (error) {

        errorHandler(error, res)

    }
}






const deleteTagById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const term = await Tag.findByIdAndDelete(id)

        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully delete" })

    } catch (error) {

        errorHandler(error, res)

    }
}








module.exports = {
    addTag,
    getAllTag,
    updateTagById,
    deleteTagById
}