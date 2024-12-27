const { addDescription, getAllDescription, updateDescriptionById, deleteDescriptionById } = require("../controllers/description.controller")

const router = require("express").Router()


router.get("/", getAllDescription)

router.post("/", addDescription)

router.put("/:id", updateDescriptionById)

router.delete("/:id", deleteDescriptionById)


module.exports = router
