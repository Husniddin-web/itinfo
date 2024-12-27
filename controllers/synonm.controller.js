const { default: mongoose } = require("mongoose")
const { errorHandler } = require("../helpers/error_handler")
const Description = require("../models/Description")
const Dictionary = require("../models/Dictionary")
const Synonm = require("../models/Synonm")
const { synonmValidation } = require("../validations/synonm.validation")

const addSynonm = async (req, res) => {
    try {
        const { error, value } = synonmValidation(req.body)
        if (error) {
            return errorHandler(error, res)
        }
        const { dict_id, desc_id } = value

        const dict = await Dictionary.findById(dict_id)

        const desc = await Description.findById(desc_id)

        if (!dict && !desc) {
            return res.status(400).send({ message: "dict_id or desc_id  is not exist" })
        }

        const snm = await Synonm.create({ dict_id, desc_id })

        res.status(200).send({ message: "Succefully created", snm })

    } catch (error) {
        errorHandler(error, res)
    }
}


const getAllSynonm = async (req, res) => {
    try {
        const sysnonms = await Synonm.find({}).populate("dict_id").populate("desc_id")

        res.status(200).send(sysnonms)
    } catch (error) {
        errorHandler(error, res)
    }
}


const updateSynonmById = async (req, res) => {
    try {

        const { id } = req.params

        const { desc_id, dict_id } = req.body

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "ID is not valid" })
        }

        const synonm = await Synonm.findByIdAndUpdate(id, { desc_id, dict_id })

        if (!synonm) {
            return res.status(400).send({ message: "Id is not found" })
        }

        res.status(200).send({ message: "Upated Succefully" })
    } catch (error) {
        errorHandler(error, res)
    }
}


const deleteSynonmById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Id is not valid" })
        }

        const synonm = await Synonm.findByIdAndDelete(id)

        if (!synonm) {
            return res.status(404).send({ message: "id not found" })
        }
        res.status(200).send({ message: "Deleted succefully" })
    } catch (error) {
        errorHandler(error, res)
    }
}


const getSyonmById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Id is not valid" })
        }

        const synonm = await Synonm.findById(id)

        if (!synonm) {
            return res.status(404).send({ message: "id not found" })
        }
        res.status(200).send(synonm)

    } catch (error) {
        errorHandler(error, res)
    }
}



module.exports = {
    addSynonm,
    getAllSynonm,
    updateSynonmById,
    deleteSynonmById,
    getSyonmById
}