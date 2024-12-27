const { default: mongoose } = require("mongoose")
const { errorHandler } = require("../helpers/error_handler")
const Dictionary = require("../models/Dictionary")
const { DescQuestionValidation } = require("../validations/desc_question.validation")
const Question = require("../models/Question")
const Description = require("../models/Description")
const DescQuestion = require("../models/Desc_Qa")

const addQuestionDesc = async (req, res) => {
    try {
        const { error, value } = DescQuestionValidation(req.body)

        if (error) {
            return errorHandler(error, res)
        }
        const { qu_id, desc_id } = value

        if (!mongoose.isValidObjectId(qu_id) && !mongoose.isValidObjectId(qu_id)) {
            return errorHandler({ message: "Id is not valid" })
        }

        const question = await Question.findById(qu_id)


        if (!question) {
            return errorHandler({ message: "question id not found" }, res)
        }

        const desc = await Description.findById(desc_id)

        if (!desc) {
            return errorHandler({ message: "desc id not found" }, res)
        }

        const quesdesc = await DescQuestion.create(value)

        res.status(201).send({ message: "Ceated succefully", quesdesc })




    } catch (error) {

        errorHandler(error, res)

    }
}



const getAllQuesDesc = async (req, res) => {
    try {

        const terms = await DescQuestion.find({}).populate("qu_id").populate("desc_id")
        res.status(200).send(terms)

    } catch (error) {

        errorHandler(error, res)

    }
}




const updateTermById = async (req, res) => {

    try {

        const { id } = req.params

        const value = req.body

        if (!mongoose.isValidObjectId(id)) {

            return res.status(400).send({ message: "Invalid id " })

        }
        if (value.qu_id) {


            const question = await Question.findById(value.qu_id)


            if (!question) {
                return errorHandler({ message: "question id not found" }, res)
            }

        }

        if (value.desc_id) {


            const desc = await Description.findById(value.desc_id)
            console.log(desc)
            if (!desc) {
                return errorHandler({ message: "desc id not found" }, res)
            }

        }


        const term = await DescQuestion.findByIdAndUpdate(id, { value })

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

        const term = await DescQuestion.findByIdAndDelete(id)

        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully delete" })

    } catch (error) {

        errorHandler(error, res)

    }
}








module.exports = {
    addQuestionDesc,
    getAllQuesDesc,
    updateTermById,
    deleteTermById
}