const { addSynonm, getAllSynonm, updateSynonmById, deleteSynonmById, getSyonmById } = require("../controllers/synonm.controller")

const router = require("express").Router()


router.get("/", getAllSynonm)

router.get("/:id", getSyonmById)

router.post("/", addSynonm)


router.put("/:id", updateSynonmById)


router.delete("/:id", deleteSynonmById)



module.exports = router