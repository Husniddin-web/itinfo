const { UserValidation } = require("../validations/user.validation")
const { errorHandler } = require("../helpers/error_handler")
const Author = require("../models/Author")
const User = require("../models/User")
const { default: mongoose } = require("mongoose")
const { QuestionValidation } = require("../validations/question.validation")
const Question = require("../models/Question")




const addQuestion = async (req, res) => {
    try {
        const { error, value } = QuestionValidation(req.body)
        if (error) {
            return errorHandler(error, res)
        }
        const { user_id, expert_id } = value

        if (!mongoose.isValidObjectId(user_id) && !mongoose.isValidObjectId(user_id)) {
            return res.status(400).send({ message: " given id is not valid" })
        }

        const user = await User.findById(user_id)

        const expert = await Author.find({ _id: expert_id, is_expert: true })

        if (!user) {
            return res.status(400).send({ message: "user id not found" })
        }

        if (expert.length == 0) {
            return res.status(400).send({ message: "expert id not found" })
        }

        const newQuestion = await Question.create(value)

        res.status(201).send({ message: "Succefullt created ", newQuestion })


    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllQuestion = async (req, res) => {

    try {

        const questions = await Question.find({}).populate("user_id").populate("expert_id")
        res.status(200).send(questions)

    } catch (error) {

        errorHandler(error, res)

    }
}




const updateQuestionById = async (req, res) => {
    try {
        const { id } = req.params
        const value = req.body

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        if (value.user_id) {

            if (!mongoose.isValidObjectId(user_id)) {
                return res.status(400).send({ message: "Invalid id " })
            }


            const user = await User.findById(user_id)

            if (!user) {
                return res.status(400).send({ message: "user id not found" })
            }

        }

        if (value.expert_id) {

            if (!mongoose.isValidObjectId(expert_id)) {
                return res.status(400).send({ message: "Invalid id " })
            }


            const expert = await Author.find({ _id: expert_id, is_expert: true })


            if (expert.length == 0) {
                return res.status(400).send({ message: "expert id not found" })
            }

        }

        const user = await Question.findByIdAndUpdate(id, value)

        if (!user) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully updated", user })

    } catch (error) {

        errorHandler(error, res)

    }
}

const deleteQuestionById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const term = await Question.findByIdAndDelete(id)

        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully delete" })

    } catch (error) {

        errorHandler(error, res)

    }
}






module.exports = {
    addQuestion,
    getAllQuestion,
    updateQuestionById,
    deleteQuestionById
}