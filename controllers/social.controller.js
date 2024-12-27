const { default: mongoose } = require("mongoose")
const { errorHandler } = require("../helpers/error_handler")
const Social = require("../models/Social")
const { socialValidation } = require("../validations/social.validation")

const addSocial = async (req, res) => {
    try {
        const { error, value } = socialValidation(req.body)

        if (error) {

            return errorHandler(error, res)
                
        }

        const { name, icon_file } = value

        const isExit = await Social.findOne({ name })

        if (isExit) {
            return res.status(400).send({ message: "This social already exists" })
        }

        const newSocial = await Social.create({ name, icon_file })

        res.status(201).send({ message: "New Social added", newSocial })

    } catch (error) {

        errorHandler(error, res)

    }
}



const getAllSocial = async (req, res) => {
    try {

        const socials = await Social.find({})
        res.status(200).send(socials)

    } catch (error) {

        errorHandler(error, res)

    }
}




const updateSocialById = async (req, res) => {
    try {
        const { id } = req.params
        const { name, icon_file } = req.body
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const social = await Social.findByIdAndUpdate(id, { name, icon_file })
        if (!social) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully updated" })

    } catch (error) {

        errorHandler(error, res)

    }
}

const deleteSocialById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const social = await Social.findByIdAndDelete(id)

        if (!social) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully delete" })

    } catch (error) {

        errorHandler(error, res)

    }
}


const getSocialByName = async (req, res) => {

    try {

        const { name } = req.query
        const social = await Social.findOne({ name })
        res.status(200).send(social)

    } catch (error) {
        errorHandler(error, res)
    }
}





module.exports = {
    addSocial,
    getAllSocial,
    updateSocialById,
    deleteSocialById,
    getSocialByName
}