const { addAuthor, getAllAuthor, getAuthorByNickName, updateAuthorById, deleteAuthorById, getAuthorById, loginAuthor, logOutAuthor, refreshAuthorToken, activateAuthor } = require("../controllers/author.controller")
const author_police = require("../police_middleware/author_police")
const author_self_police = require("../police_middleware/author_self_police")

const router = require("express").Router()


router.get("/", author_police, getAllAuthor)


router.get("/nick-name", getAuthorByNickName)


router.post("/", addAuthor)


router.post("/login", loginAuthor)

router.post("/logout", logOutAuthor)

router.post("/refreshtoken", refreshAuthorToken)

router.get("/:id", author_police, author_self_police, getAuthorById)

router.get("/activate/:link", activateAuthor)


router.put("/:id", author_police, author_self_police, updateAuthorById)


router.delete("/:id", author_police, author_self_police, deleteAuthorById)




module.exports = router