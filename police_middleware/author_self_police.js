
module.exports = async function (req, res, next) {

    try {
        const { id } = req.params

        if (id !== req.author.id) {
            return res.status(403).send({ message: "Sizda bunday huquq yoq" })
        }

        next()

    } catch (error) {
        console.log(error)
        return res.status(403).send({ message: error.message })
    }
}