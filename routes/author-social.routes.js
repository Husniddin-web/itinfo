const { addAuthorSocial, getAllAuthorSocial, getAuthorSocialById, updateAuthorSocialById, deleteAuthorSocialById } = require("../controllers/author-social.controller")

const router = require("express").Router()



router.get("/", getAllAuthorSocial)

router.get("/:author_id", getAuthorSocialById)

router.post("/", addAuthorSocial)

router.put("/:id", updateAuthorSocialById)

router.delete("/:id", deleteAuthorSocialById)





module.exports = router