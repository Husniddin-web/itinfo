const { default: mongoose, mongo } = require("mongoose")
const { errorHandler } = require("../helpers/error_handler")
const Category = require("../models/Category")
const Joi = require("joi")
const { categoryValidation } = require("../validations/category.validation")

const addCategory = async (req, res) => {
    try {

        const { error, value } = categoryValidation(req.body)

        if (error) {
            return errorHandler(error, res)
        }
        const { category_name, parent_category_id } = value

        const oldCategory = await Category.findOne({ category_name })

        if (oldCategory) {
            return res.status(404).send({ message: "This category is already exit" })
        }

        const category = await Category.create({ category_name, parent_category_id })

        res.status(201).send({ message: "Succefully add", category })
    } catch (error) {

        errorHandler(error, res)
    }
}

const getAllCategory = async (req, res) => {
    try {

        const categories = await Category.find({}).populate("descriptions")
        res.status(200).send(categories)

    } catch (error) {
        errorHandler(error, res)
    }
}



const getCategoryByName = async (req, res) => {
    try {
        const { category_name } = req.query

        if (!category_name) {
            return res.status(400).send({ message: "Category Name query parameter is required" })
        }

        const category = await Category.find({ category_name: { $regex: new RegExp(category_name, "gi") } }).populate("descriptions")


        if (category.length == 0) {
            return res.status(404).send({ message: "Category not found" })
        }

        res.status(200).send(category)


    } catch (error) {

        errorHandler(error, res)

    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Id is not valid" })
        }

        const category = await Category.findById(id).populate("descriptions")

        if (!category) {
            return res.status(400).send({ message: "Id is not found" })
        }

        res.status(200).send(category)
    } catch (error) {
        errorHandler(error, res)
    }
}


const updateCategoryById = async (req, res) => {
    const { id } = req.params
    const { category_name, parent_category_id } = req.body

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ message: "ID is not valid" })
    }

    const category = await Category.findByIdAndUpdate(id, { category_name, parent_category_id }, { new: true })


    if (!category) {
        return res.status(404).send({ message: "ID IS NOT FOUND" })
    }

    res.status(200).send({ message: "Updated Succefully", category })
}



const deleteCategoryById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ message: "id is not valid" })
    }

    const category = await Category.findByIdAndDelete(id)

    if (!category) {
        return res.status(404).send({ message: "ID not  found" })
    }

    res.status(200).send({ message: "Deleted Succefully" })
}



module.exports = {
    addCategory,
    getAllCategory,
    getCategoryByName,
    updateCategoryById,
    deleteCategoryById,
    getCategoryById
}