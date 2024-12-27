const { addTerm, getAllTerm, getTermByLetter, updateTermById, deleteTermById, findTermByQuery } = require("../controllers/dic.controller")

const router = require("express").Router()


router.get("/all", getAllTerm)

router.get("/letter", getTermByLetter)

router.get("/", findTermByQuery)

router.post("/create", addTerm)

router.put("/:id", updateTermById)

router.delete("/delete/:id", deleteTermById)




module.exports = router
