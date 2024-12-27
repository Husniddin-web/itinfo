const { addTopic, getAllTopics, getTopicByAuthorId, getTopicByExpertId, updateTopicById, deleteTopicById, findTopicByTitleTopicByQuery } = require('../controllers/topic.controller')
const author_police = require('../police_middleware/author_police')
const author_self_police = require('../police_middleware/author_self_police')

const router = require('express').Router()



router.get("/any", findTopicByTitleTopicByQuery)

router.get("/", getAllTopics)

router.get("/:id", getTopicByAuthorId)

router.get("/expert/:id", getTopicByExpertId)


router.post("/", addTopic)

router.put("/:id", updateTopicById)

router.delete("/:id", deleteTopicById)





module.exports = router