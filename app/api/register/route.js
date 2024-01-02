import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
import { errorHandler } from '../../../helpers/error';
import dbConnect from '../../../helpers/db-connect';
import RegisterModel from '../../../Models/Register';


dbConnect()

export const POST = async (req) => {
    const { userName, email, password } = await req.json()
    if (!userName || !email || !password) {
        return errorHandler(NextResponse, 400, "Please enter all fields.")
    }
    let user = await RegisterModel.findOne({ email })
    if (user) {
        return errorHandler(NextResponse, 400, "User already exists.")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    user = await RegisterModel.create({
        userName, email, password: hashedPassword
    })

    return NextResponse.json("User register successfully", { status: 201 });

}



