const { addAdmin, loginAdmin, getAllAdmin, getAdminByName, updateAdminById, deleteAdminById, logOutAdmin, refreshTokenAdmin } = require("../controllers/admin.controller")
const admin_police = require("../police_middleware/admin_police")
const admin_self_police = require("../police_middleware/admin_self_police")
const creator_police = require("../police_middleware/creator_police")

const router = require("express").Router()



router.get("/", admin_police, creator_police, getAllAdmin) // creator police 

router.get('/name', getAdminByName)

router.post("/",  addAdmin) // creator police 

router.post("/login", loginAdmin)

router.post("/logout", logOutAdmin)

router.post("/refreshtoken", refreshTokenAdmin)

router.put("/:id", admin_police, admin_self_police, updateAdminById)

router.delete("/:id", admin_police, admin_self_police, deleteAdminById)



module.exports = router