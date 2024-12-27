const { default: mongoose } = require("mongoose")
const { errorHandler } = require("../helpers/error_handler")
const Dictionary = require("../models/Dictionary")
const { dictionaryValidation } = require("../validations/dictionary.validation")

const addTerm = async (req, res) => {
    try {
        const { error, value } = dictionaryValidation(req.body)
        if (error) {
            return errorHandler(error, res)
        }
        const { term } = value

        const oldTerm = await Dictionary.findOne({ term })

        if (oldTerm) {
            return res.status(400).send({ message: "This term already exists" })
        }

        const newTerm = await Dictionary.create({ term, letter: term[0] })

        res.status(201).send({ message: "New Term added", newTerm })

    } catch (error) {

        errorHandler(error, res)

    }
}



const getAllTerm = async (req, res) => {
    try {

        const terms = await Dictionary.find({})
        res.status(200).send(terms)

    } catch (error) {

        errorHandler(error, res)

    }
}


const getTermByLetter = async (req, res) => {
    try {
        const { letter } = req.body

        const term = await Dictionary.find({ letter })

        if (!term) {
            return res.status(404).send({ message: "NOT FOUND" })
        }

        res.status(200).send({ term })

    } catch (error) {

        errorHandler(error, res)

    }
}



const updateTermById = async (req, res) => {
    try {
        const { id } = req.params
        const { updateTerm } = req.body
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const term = await Dictionary.findByIdAndUpdate(id, { term: updateTerm, letter: updateTerm[0] })
        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully updated", term })

    } catch (error) {

        errorHandler(error, res)

    }
}

const deleteTermById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const term = await Dictionary.findByIdAndDelete(id)

        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully delete" })

    } catch (error) {

        errorHandler(error, res)

    }
}


const findTermByQuery = async (req, res) => {
    const { termName } = req.query

    if (!termName) {
        return res.status(400).json({ message: "termName query parameter is required" });
    }

    const term = await Dictionary.find({ term: { $regex: new RegExp(termName, "gi") } })
    if (term.length == 0) {
        return res.status(404).send({ message: "NOT FOUND TERM NAME" })
    }
    res.status(200).send({ term })
}






module.exports = {
    addTerm,
    getAllTerm,
    getTermByLetter,
    updateTermById,
    deleteTermById,
    findTermByQuery
}