const { default: mongoose } = require("mongoose")
const { errorHandler } = require("../helpers/error_handler")
const Author = require("../models/Author")
const Topics = require("../models/Topics")
const { topicValidation } = require("../validations/topic.validation")

const addTopic = async (req, res) => {
    try {

        const { error, value } = topicValidation(req.body)

        if (error) {
            return errorHandler(error, res)
        }

        const { author_id, topic_title, topic_text, is_checked, is_approved, expert_id } = value

        const author = await Author.findById({ _id: author_id })

        const expert = await Author.findById({ _id: expert_id })


        if (!author) {
            return res.status(400).send({ message: "Author  is not exists" })
        }

        if (!expert) {
            return res.status(400).send({ message: "Expert  is not exists" })
        }

        if (!expert.is_expert) {
            return res.status(400).send({ message: "Expert_id is not expert" })
        }


        await Topics.create({ author_id, topic_title, topic_text, is_checked, is_approved, expert_id })

        res.status(201).send({ message: "New Topci added" })

    } catch (error) {

        errorHandler(error, res)

    }
}



const getAllTopics = async (req, res) => {
    try {

        const topics = await Topics.find({}).populate("author_id").populate("expert_id")
        res.status(200).send(topics)

    } catch (error) {

        errorHandler(error, res)

    }
}


const getTopicByAuthorId = async (req, res) => {

    try {

        const { id } = req.params

        const authorTopic = await Topics.find({ author_id: id }).populate("author_id")


        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).send({ message: "ID is not valid" })
        }


        if (!authorTopic) {
            return res.status(404).send({ message: "NOT FOUND" })
        }

        res.status(200).send({ authorTopic })

    } catch (error) {

        errorHandler(error, res)

    }
}



const getTopicByExpertId = async (req, res) => {

    try {

        const { id } = req.params

        const expertCheckedTopic = await Topics.find({ expert_id: id }).populate("expert_id")


        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).send({ message: "ID is not valid" })
        }


        if (!expertCheckedTopic) {
            return res.status(404).send({ message: "NOT FOUND" })
        }

        res.status(200).send({ expertCheckedTopic })

    } catch (error) {

        errorHandler(error, res)

    }
}











const updateTopicById = async (req, res) => {
    try {

        const body = req.body

        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {

            return res.status(400).send({ message: "Invalid id " })

        }

        const updatedTopic = await Topics.findByIdAndUpdate(id, { body })

        if (!updatedTopic) {

            return res.status(400).send({ message: "NOT FOND GIVEN ID" })

        }

        res.status(200).send({ message: "Succefully updated" })

    } catch (error) {

        errorHandler(error, res)

    }
}

const deleteTopicById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const term = await Topics.findByIdAndDelete(id)

        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully delete" })

    } catch (error) {

        errorHandler(error, res)

    }
}


const findTopicByTitleTopicByQuery = async (req, res) => {
    try {
        const { title } = req.query
        console.log(title)
        if (!title) {
            return res.status(400).json({ message: "title query parameter is required" });
        }
        const results = await Topics.find({
            $or: [
                { topic_title: { $regex: title, $options: 'i' } },
                { topic_text: { $regex: title, $options: 'i' } },
            ],
        });

        res.status(200).json(results);
    } catch (error) {
        errorHandler(error, res)
    }
}






module.exports = {
    addTopic,
    getAllTopics,
    getTopicByAuthorId,
    getTopicByExpertId,
    updateTopicById,
    deleteTopicById,
    findTopicByTitleTopicByQuery
}