const { UserValidation } = require("../validations/user.validation")
const { errorHandler } = require("../helpers/error_handler")
const User = require("../models/User")
const { default: mongoose } = require("mongoose")
const bcrypt = require("bcrypt")
const config = require("config")
const uuid = require("uuid")

const userJwt = require("../services/jwt_services")
const { to } = require("../helpers/to_promise")
const mailService = require("../services/mail.service")



const addUser = async (req, res) => {
    try {
        const { error, value } = UserValidation(req.body)

        if (error) {
            return errorHandler(error, res)
        }
        const { email } = value

        const oldUser = await User.findOne({ email })

        if (oldUser) {
            return res.status(400).send({ message: "This User already exists" })
        }

        const hasshedPassword = bcrypt.hashSync(value.password, 10)

        const activation_link = uuid.v4()


        const newUser = await User.create({ ...value, password: hasshedPassword, activation_link })

        await mailService.sendMailActivationCode(email, `${config.get("api_url")}/api/user/activate/${activation_link}`)

        res.status(201).send({ message: "Succefullt created ", newUser })


    } catch (error) {
        errorHandler(error, res)
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const oldUser = await User.findOne({ email })

        if (!oldUser) {
            return res.status(401).send({ message: "email yoki parol notogri" })
        }

        const validPassword = bcrypt.compareSync(password, oldUser.password)

        if (!validPassword) {
            return res.status(400).send({ message: "email yoki parol notogri" })
        }

        const tokens = userJwt.generateToken({
            id: oldUser._id,
            email: oldUser.email,
            name: oldUser.name,
            is_active: oldUser.is_active
        })

        oldUser.refresh_token = tokens.refreshToken

        await oldUser.save()

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: config.get("refresh_token_ms")
        })

        res.status(200).send({ message: "Hush kelibsiz", ...tokens })

    } catch (error) {

        errorHandler(error, res)

    }

}


const logOutUser = async (req, res) => {
    try {

        const { refreshToken } = req.cookies

        if (!refreshToken) {
            return res.status(401).send({ message: "Cookie token topilmadi" })
        }

        const user = await User.findOneAndUpdate({ refresh_token: refreshToken }, { refresh_token: "" }, { new: true })

        if (!user) {

            return res.status(401).send({ message: "Bunday tokenli user yoq" });

        }

        res.clearCookie("refreshToken")

        res.status(200).send({ message: "Log out" })

    } catch (error) {
        errorHandler(error, res)
    }
}


const refreshUserToken = async (req, res) => {

    try {
        console.log("1")
        const { refreshToken } = req.cookies

        if (!refreshToken) {

            return res.status(401).send({ message: "in cookie  token is not find" })

        }

        const [error, tokenFromCookie] = await to(userJwt.verifyRefreshToken(refreshToken))

        if (error) {

            return res.status(401).send({ error: "User" })

        }

        const user = await User.findOne({ refresh_token: refreshToken })

        if (!user) {
            return res.status(404).send({ message: "User not found " })
        }

        const tokens = userJwt.generateToken({
            id: user._id,
            email: user.email,
            name: oldUser.name,
            is_active: user.is_active
        })

        user.refresh_token = tokens.refreshToken

        await user.save()

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: config.get("refresh_token_ms")
        })

        res.status(200).send({ message: "Succes refresh token" })


    } catch (error) {
        errorHandler(error, res)
    }
}






const getAllUser = async (req, res) => {

    try {

        const users = await User.find({})
        res.status(200).send(users)

    } catch (error) {

        errorHandler(error, res)

    }
}


const getUserByName = async (req, res) => {
    try {

        const { name } = req.body


        const user = await User.find({ name })

        if (!user) {
            return res.status(404).send({ message: "NOT FOUND" })
        }

        res.status(200).send({ user })

    } catch (error) {

        errorHandler(error, res)

    }
}



const updateUserById = async (req, res) => {
    try {
        const { id } = req.params
        const value = req.body

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const user = await User.findByIdAndUpdate(id, value)

        if (!user) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully updated", user })

    } catch (error) {

        errorHandler(error, res)

    }
}

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const term = await User.findByIdAndDelete(id)

        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully delete" })

    } catch (error) {

        errorHandler(error, res)

    }
}






module.exports = {
    addUser,
    getAllUser,
    getUserByName,
    updateUserById,
    deleteUserById,
    loginUser,
    logOutUser,
    refreshUserToken
}