const { default: mongoose } = require("mongoose")
const { errorHandler } = require("../helpers/error_handler")
const bcrypt = require('bcrypt');
const { adminValidation } = require("../validations/admin.validation");
const Admin = require("../models/Admin");

const adminJwt = require("../services/jwt_services")
const { to } = require("../helpers/to_promise")

const addAdmin = async (req, res) => {
    try {
        const { error, value } = adminValidation(req.body)

        if (error) {

            return errorHandler(error, res)

        }

        const { email, password } = value

        const oldAdmin = await Admin.findOne({ email })

        if (oldAdmin) {
            return res.status(400).send({ message: "This Admin already exists" })
        }

        const hashhedPassword = bcrypt.hashSync(password, 7)

        const newAdmin = await Admin.create({ ...value, password: hashhedPassword })

        res.status(201).send({ message: "New Admin added", newAdmin })

    } catch (error) {

        errorHandler(error, res)

    }
}


const loginAdmin = async (req, res) => {

    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email });

        if (!admin) {

            return res.status(401).send({ message: "Email yoki parol notogri" })

        }

        const validPassword = bcrypt.compareSync(password, admin.password)



        if (!validPassword) {

            return res.status(401).send({ message: "Email yoki parol notogri" })

        }
        const payload = {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            is_active: admin.is_active,
            is_creator: admin.is_creator
        }

        const tokens = adminJwt.generateToken(payload)

        admin.refresh_token = tokens.refreshToken

        await admin.save()

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: 129600
        })

        res.status(200).send({ message: "Tizimga Hush kelibsiz", ...tokens })

    } catch (error) {
        errorHandler(error, res)
    }
}


const logOutAdmin = async (req, res) => {

    try {
        const { refreshToken } = req.cookies

        if (!refreshToken) {
            return res.status(401).send({ message: "Unauthenctication" })
        }

        const admin = await Admin.findOneAndUpdate({ refresh_token: refreshToken }, { refresh_token: "" }, { new: true })

        if (!admin) {
            return res.status(404).send({ message: "User not found" })
        }
        res.clearCookie("refreshToken")

        res.status(200).send({ message: "log out" })

    } catch (error) {
        errorHandler(error, res)
    }



}



const refreshTokenAdmin = async (req, res) => {

    try {
        const { refreshToken } = req.cookies

        if (!refreshToken) {
            return res.status(400).send({ message: "Token topilamdi" })
        }

        const [error, decoded] = await to(adminJwt.verifyRefreshToken(refreshToken))

        if (error) {
            return res.status(401).send({ mesagge: error.message })
        }

        const admin = await Admin.findOne({ refresh_token: refreshToken })

        if (!admin) {
            return res.status(404).send({ message: "Admin not found" })
        }
        const tokens = adminJwt.generateToken({
            id: admin._id,
            email: admin.email,
            is_creator: admin.is_creator
        })

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: 159000
        })

        admin.refresh_token = tokens.refreshToken

        await admin.save()

        res.status(200).send({ message: "Succes ", accessToken: tokens.accessToken })

    } catch (error) {

        errorHandler(error, res)
    }


}



const getAllAdmin = async (req, res) => {
    try {

        const admins = await Admin.find({})
        res.status(200).send(admins)

    } catch (error) {

        errorHandler(error, res)

    }
}


const getAdminByName = async (req, res) => {
    try {
        const { name } = req.body


        const admin = await Admin.find({ name })

        if (!admin) {
            return res.status(404).send({ message: "NOT FOUND" })
        }

        res.status(200).send({ admin })

    } catch (error) {

        errorHandler(error, res)

    }
}



const updateAdminById = async (req, res) => {
    try {
        const { id } = req.params
        const value = req.body
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const admin = await Admin.findByIdAndUpdate(id, value)
        if (!admin) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully updated", admin })

    } catch (error) {

        errorHandler(error, res)

    }
}

const deleteAdminById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid id " })
        }

        const term = await Admin.findByIdAndDelete(id)

        if (!term) {
            return res.status(400).send({ message: "NOT FOND GIVEN ID" })
        }

        res.status(200).send({ message: "Succefully delete" })

    } catch (error) {

        errorHandler(error, res)

    }
}






module.exports = {
    addAdmin,
    loginAdmin,
    getAllAdmin,
    getAdminByName,
    updateAdminById,
    deleteAdminById,
    logOutAdmin,
    refreshTokenAdmin
}