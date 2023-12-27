import mongoose, { models, model } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types

const registerSchema = new mongoose.Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
})

const RegisterModel = models.Register || model('Register', registerSchema)

export default RegisterModel