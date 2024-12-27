const { default: mongoose } = require("mongoose")
const { errorHandler } = require("../helpers/error_handler")
const Author = require("../models/Author")
const { authorValidation } = require("../validations/author.validation")
const bcrypt = require('bcrypt');
const config = require("config")
const authorJwt = require("../services/jwt_services")
const { to } = require("../helpers/to_promise")
const uuid = require("uuid")
const mailService = require("../services/mail.service")

const addAuthor = async (req, res) => {

    try {

        const { error, value } = authorValidation(req.body)

        console.log(error)

        if (error) {

            return errorHandler(error, res)

        }

        const { email, password } = value

        const oldAuthor = await Author.findOne({ email })

        if (oldAuthor) {

            return res.status(400).send({ error: "This Author already exists" })

        }

        const hashhedPassword = bcrypt.hashSync(password, 7)


        const activation_link = uuid.v4()

        const newAuthor = await Author.create({ ...value, password: hashhedPassword, activation_link })

        await mailService.sendMailActivationCode(value.email, `${config.get("api_url")}/api/author/activate/${activation_link}`)

        res.status(201).send({ message: "New Author added", newAuthor })

    } catch (error) {

        errorHandler(error, res)

    }
}


const loginAuthor = async (req, res) => {

    try {
        const { email, password } = req.body

        const author = await Author.findOne({ email });

        if (!author) {

            return res.status(401).send({ message: "Email yoki parol notogri" })

        }

        const validPassword = bcrypt.compareSync(password, author.password)


        if (!validPassword) {

            return res.status(401).send({ message: "Email yoki parol notogri" })

        }

        const payload = {

            id: author._id,
            email: author.email,
            is_active: author.is_active

        }

        const tokens = authorJwt.generateToken(payload)

        author.refresh_token = tokens.refreshToken

        await author.save()

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: config.get("refresh_token_ms")
        })



        // new Promise((_, reject) => {
        //     reject(new Error("unhandledRejection example"))
        // })

        res.status(200).send({ message: "Tizimga Hush kelibsiz", accessToken: tokens.accessToken, author_id: author._id })

    } catch (error) {

        errorHandler(error, res)

    }
}


const logOutAuthor = async (req, res) => {
    try {
        const { refreshToken } = req.cookies

        if (!refreshToken) {
            return res.status(400).send({ message: "Token topilmadi" })
        }

        const author = await Author.findOneAndUpdate({ refresh_token: refreshToken }, { refresh_token: "" }, { new: true })

        if (!author) {

            return res.status(400).send({ message: "Bunday tokenli author yo'q" })

        }

        res.clearCookie("refreshToken")

        res.send({ refreshToken: author.refresh_token })

    } catch (error) {
        errorHandler(error, res)
    }
}

const refreshAuthorToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies

        if (!refreshToken) {
            return res.status(400).send({ message: "Cookieda token topilmadi" })
        }
        const [error, tokenFromCookie] = await to(authorJwt.verifyRefreshToken(refreshToken))

        if (error) {

            return res.status(401).send({ message: error.message })

        }

        const author = await Author.findOne({ refresh_token: refreshToken })

        if (!author) {
            return res.status(404).send({ message: "Not found" })
        }


        const payload = {

            id: author._id,
            email: author.email,
            is_active: author.is_active

        }

        const tokens = authorJwt.generateToken(payload)

        author.refresh_token = tokens.refreshToken

        await author.save()

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: config.get("refresh_token_ms")
        })


        res.status(200).send({ message: "Tizimga Hush kelibsiz", ...tokens })

    } catch (error) {
        errorHandler(error, res)
    }
}




const getAllAuthor = async (req, res) => {
    try {


        const authors = await Author.find({})

        res.status(200).send(authors)


    } catch (error) {

        errorHandler(error, res)

    }
}


const getAuthorByNickName = async (req, res) => {
    try {
        const { nick_name } = req.body


        const author = await Author.find({ nick_name })

        if (!author) {
            return res.status(404).send({ message: "NOT FOUND" })
        }

        res.status(200).send({ author })

    } catch (error) {

        errorHandler(error, res)

    }
}



const updateAuthorById = async (req, res) => {
    try {
        const { id } = req.params
        const { first_name, last_name, nick_name, email, phone, password, info, position, photo, is_expert, is_active } = req.body
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const author = await Author.findByIdAndUpdate(id, { first_name, last_name, nick_name, email, phone, password, info, position, photo, is_expert, is_active })
        if (!author) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully updated", author })

    } catch (error) {

        errorHandler(error, res)

    }
}

const deleteAuthorById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const term = await Author.findByIdAndDelete(id)

        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully delete" })

    } catch (error) {

        errorHandler(error, res)

    }
}




const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params

        if (id !== req.author.id) {
            return res.status(403).send({ message: "Sizda bunday huquq yoq" })
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const term = await Author.findById(id)

        if (!term) {

            return res.status(400).send({ message: "NOT FOND GIVEN ID" })

        }

        res.status(200).send(term)

    } catch (error) {

        errorHandler(error, res)

    }
}

const activateAuthor = async (req, res) => {
    try {
        const { link } = req.params
        const author = await Author.findOne({ activation_link: link })

        if (!author) {
            return res.status(404).send({ message: "Not found" })
        }

        if (author.is_active) {
            return res.status(404).send({ message: "Author is already active" })
        }
        author.is_active = true

        await author.save()

        res.status(200).send({ message: "Avtor faollashtirldi", is_active: author.is_active })

    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = {
    addAuthor,
    getAllAuthor,
    getAuthorByNickName,
    updateAuthorById,
    deleteAuthorById,
    getAuthorById,
    loginAuthor,
    logOutAuthor,
    refreshAuthorToken,
    activateAuthor
}