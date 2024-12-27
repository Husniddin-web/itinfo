const adminJwt = require("../services/jwt_services")
const { to } = require("../helpers/to_promise")



module.exports = async function (req, res, next) {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            return res.status(401).send({ message: "Unauthorization" })
        }
        const bearer = authorization.split(" ")[0]

        const token = authorization.split(" ")[1]

        if (bearer !== "Bearer" || !token) {
            return res.status(401).send({ message: "Unauthorization" })
        }


        const [error, decodedToken] = await to(adminJwt.verifyAccessToken(token))

        if (error) {
            return res.status(401).send({ message: error.message })
        }
        req.admin = decodedToken
        console.log(decodedToken)
        next()
    } catch (error) {
        return res.status(401).send({ message: error.message })
    }
}