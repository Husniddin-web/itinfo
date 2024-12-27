module.exports = async function (req, res, next) {
    try {
        if (!req.admin.is_creator) {
            return res.status(403).send({ message: "Sizda bunday imkonyat yoq" })
        }

        next()


    } catch (error) {
        return errorHandler(error, res)
    }
}