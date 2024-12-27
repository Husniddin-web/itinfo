const { addQuestionDesc, getAllQuesDesc, updateTermById, deleteTermById } = require("../controllers/desc-question.controller")

const router = require("express").Router()



router.get("/", getAllQuesDesc)

router.post("/", addQuestionDesc)

router.put("/:id", updateTermById)

router.delete("/:id", deleteTermById)

module.exports = router