const router = require("express").Router()
const { createViewPage } = require("../helpers/create_view_page")



router.get("/", (req, res) => {
    res.render(createViewPage("index"), {
        title: "Asosiy sahifa",
        isHome: true
    })
})



router.get("/dictionary", (req, res) => {
    res.render(createViewPage("dictionary"), {
        title: "Lugatlar",
        isDict: true
    })
})



router.get("/topic", (req, res) => {
    res.render(createViewPage("topics"), {
        title: "Maqolalar",
        isTopic: true
    })
})




router.get("/author", (req, res) => {
    res.render(createViewPage("author"), {
        title: "Mualiflar",
        isAuthor: true
    })
})

router.get("/login", (req, res) => {
    res.render(createViewPage("login"), {
        title: "Login",
        isLogin: true
    })
})

router.get("/register", (req, res) => {
    res.render(createViewPage("register"), {
        title: "Register",
        isRegister: true
    })
})


router.get("/admin", (req, res) => {
    res.render(createViewPage("admin"), {
        title: "Admins",
        isAdmin: true
    })
})


module.exports = router