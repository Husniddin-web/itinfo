const { addSocial, getAllSocial, updateSocialById, deleteSocialById, getSocialByName } = require("../controllers/social.controller")

const router = require("express").Router()

router.get("/", getAllSocial)

router.get("/name", getSocialByName)

router.post("/", addSocial)

router.put("/:id", updateSocialById)

router.delete("/:id", deleteSocialById)


module.exports = router