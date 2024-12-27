const { addCategory, getAllCategory, getCategoryByName, updateCategoryById, deleteCategoryById, getCategoryById } = require("../controllers/category.controller")

const router = require("express").Router()


router.get("/all", getAllCategory)

router.get("/", getCategoryByName)

router.get("/:id", getCategoryById)

router.post("/create", addCategory)

router.put("/update/:id", updateCategoryById)

router.delete("/:id", deleteCategoryById)

module.exports = router