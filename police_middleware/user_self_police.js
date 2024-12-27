const { errorHandler } = require("../helpers/error_handler")

module.exports = async function (req, res, next) {

    try {

        const { id } = req.params

        if (id !== req.user.id) {
            return res.status(403).send({ message: "Bunday huqu sizda yoq" })
        }
        next()


    } catch (error) {
        return res.status(403).send({ message: error.message })
    }

}