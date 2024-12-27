const authorJwt = require("../services/jwt_services")
const { to } = require("../helpers/to_promise")




module.exports = async function (req, res, next) {

    try {

        const authorization = req.headers.authorization;

        if (!authorization) {

            return res.status(401).send({ error: "Unauthentication" })

        }

        const bearer = authorization.split(" ")[0]


        const token = authorization.split(" ")[1]

        console.log(token)

        if (!token) {

            return res.status(401).send({ error: "Unanhentication" })
        }

        const [error, decodedToken] = await to(authorJwt.verifyAccessToken(token))

        if (error) {

            return res.status(401).send({ error: error.message })

        }

        console.log(decodedToken)

        req.author = decodedToken
        next()

    } catch (error) {
        console.log(error)
        return res.status(403).send({ error: error.message })
    }
}