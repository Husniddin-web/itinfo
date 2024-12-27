module.exports = async function (req, res, next) {

    try {

        const { id } = req.params

        if (id !== req.admin.id) {
            return res.status(403).send({ message: "Sizda bunday imkonyat yoq" })
        }
        next()
    } catch (error) {
        return errorHandler(error, res)
    }

}