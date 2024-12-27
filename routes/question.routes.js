const { addQuestion, getAllQuestion, updateQuestionById, deleteQuestionById } = require('../controllers/question.controller')

const router = require('express').Router()



router.get("/", getAllQuestion)


router.post("/", addQuestion)

router.put("/:id", updateQuestionById)

router.delete("/:id", deleteQuestionById)



module.exports = router