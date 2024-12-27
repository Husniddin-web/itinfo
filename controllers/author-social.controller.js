const { default: mongoose } = require("mongoose")
const { errorHandler } = require("../helpers/error_handler")
const AuthorSocial = require("../models/AuthorSocial")
const { authorSocialValidation } = require("../validations/author_social.validation")

const addAuthorSocial = async (req, res) => {
    try {
        const { error, value } = authorSocialValidation(req.body)
        if (error) {
            return errorHandler(error, res)
        }
        const { social_id, author_id, social_link } = value



        const newAuthorSocial = await AuthorSocial.create({ social_id, author_id, social_link })

        res.status(201).send({ message: "New Term added", newAuthorSocial })

    } catch (error) {

        errorHandler(error, res)

    }
}



const getAllAuthorSocial = async (req, res) => {
    try {

        const socials_author = await AuthorSocial.find({}).populate("social_id").populate("author_id")
        res.status(200).send(socials_author)

    } catch (error) {

        errorHandler(error, res)

    }
}


const getAuthorSocialById = async (req, res) => {
    try {
        const { author_id } = req.params

        const authorSocial = await AuthorSocial.find({ author_id }).populate("social_id")

        if (!authorSocial) {
            return res.status(404).send({ message: "NOT FOUND" })
        }

        res.status(200).send({ authorSocial })

    } catch (error) {

        errorHandler(error, res)

    }
}



const updateAuthorSocialById = async (req, res) => {
    try {
        const { id } = req.params
        const { author_id, social_id, social_link } = req.body
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const updatedSocialAuthor = await AuthorSocial.findByIdAndUpdate(id, { author_id, social_id, social_link })

        if (!updatedSocialAuthor) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully updated" })

    } catch (error) {

        errorHandler(error, res)

    }
}

const deleteAuthorSocialById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const term = await AuthorSocial.findByIdAndDelete(id)

        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully delete" })

    } catch (error) {

        errorHandler(error, res)

    }
}









module.exports = {
    addAuthorSocial,
    getAllAuthorSocial,
    getAuthorSocialById,
    updateAuthorSocialById,
    deleteAuthorSocialById,
}