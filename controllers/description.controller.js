const { default: mongoose } = require("mongoose")
const { errorHandler } = require("../helpers/error_handler")
const Description = require("../models/Description")
const Category = require("../models/Category")
const { descriptionValidation } = require("../validations/description.validation")

const addDescription = async (req, res) => {

    try {
        
        const { error, value } = descriptionValidation(req.body)


        if (error) {

            return errorHandler(error, res)

        }

        const { category_id, description } = value

        const category = await Category.findById(category_id)

        if (!category) {
            return res.status(400).send({ message: "Given category id is not exist" })
        }

        const newDescription = await Description.create({ category_id, description })


        category.descriptions.push(newDescription)

        await category.save()

        res.status(201).send({ message: "New Term added", newDescription })

    } catch (error) {

        errorHandler(error, res)

    }
}



const getAllDescription = async (req, res) => {
    try {

        const descrps = await Description.find({}).populate("category_id")
        res.status(200).send(descrps)

    } catch (error) {

        errorHandler(error, res)

    }
}


const updateDescriptionById = async (req, res) => {
    try {
        const { id } = req.params
        const { category_id, description } = req.body
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const descr = await Description.findByIdAndUpdate(id, { category_id, description })
        if (!descr) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully updated", descr })

    } catch (error) {

        errorHandler(error, res)

    }
}

const deleteDescriptionById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const term = await Description.findByIdAndDelete(id)

        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully delete" })

    } catch (error) {

        errorHandler(error, res)

    }
}


module.exports = {
    addDescription,
    getAllDescription,
    updateDescriptionById,
    deleteDescriptionById
}