const { addTag, getAllTag, updateTagById, deleteTagById } = require("../controllers/tag.controller")

const router = require("express").Router()



router.get("/", getAllTag)

router.post("/", addTag)

router.put("/:id", updateTagById)

router.delete("/:id", deleteTagById)

module.exports = router