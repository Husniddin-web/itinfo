const { addUser, getAllUser, updateUserById, getUserByName, deleteUserById, loginUser, logOutUser, refreshUserToken } = require("../controllers/user.controller")
const admin_police = require("../police_middleware/admin_police")
const user_police = require("../police_middleware/user_police")
const user_self_police = require("../police_middleware/user_self_police")

const router = require("express").Router()

router.get("/", admin_police, getAllUser)

router.get("/name", getUserByName)

router.post("/", admin_police, addUser)

router.post("/login", loginUser)


router.post("/logout", logOutUser)


router.post("/refreshtoken", refreshUserToken)


router.put("/:id", user_police, user_self_police, updateUserById)

router.delete("/:id", user_police, user_self_police, deleteUserById)





module.exports = router