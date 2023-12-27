import jwt from "jsonwebtoken"

const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JSON_TOKEN)
}

export default generateToken