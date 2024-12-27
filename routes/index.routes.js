const router = require("express").Router()


const DicRoute = require("./dic.routes")

const CategoryRoute = require("./category.routes")

const DescriptionRoute = require("./description.routes")

const SynonmRoutes = require("./synonm.routes")

const AuthorRoutes = require("./author.routes")

const SocialRoutes = require("./social.routes")

const AuthorSocial = require("./author-social.routes")

const TopicsRoute = require("./topic.routes")

const UserRoute = require("./user.routes")

const QuestionRoutes = require("./question.routes")


const DescQuestionRoutes = require("./desc-question.routes")

const TagRoutes = require("./tag.routes")

const AdminRoutes = require("./admin.routes")

router.use("/dic", DicRoute)

router.use("/category", CategoryRoute)

router.use("/description", DescriptionRoute)

router.use("/synonm", SynonmRoutes)

router.use("/author", AuthorRoutes)

router.use("/social", SocialRoutes)

router.use("/author-social", AuthorSocial)

router.use("/topic", TopicsRoute)

router.use("/user", UserRoute)

router.use("/question", QuestionRoutes)

router.use("/desc-question", DescQuestionRoutes)

router.use("/tag", TagRoutes)

router.use('/admin', AdminRoutes)

module.exports = router

