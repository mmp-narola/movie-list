import mongoose, { Schema, models, model } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
})

const LoginModel = models.Login || model('Login', loginSchema)

export default LoginModel