import { NextResponse } from 'next/server';
import dbConnect from '../../../helpers/db-connect';
import bcrypt from 'bcrypt'
import RegisterModel from '../../../Models/Register';
import generateToken from '../../../helpers/generateToken';
import { errorHandler } from '../../../helpers/error';
import { cookieSetter } from '../../../helpers/cookieSetter';

dbConnect()

export const POST = async (request) => {
    try {

        const { email, password } = await request.json()

        if (!email) {
            return new NextResponse('Missing Email.', { status: 400 })
        }
        if (!password) {
            return new NextResponse('Missing Password.', { status: 400 })
        }

        let user = await RegisterModel.findOne({ email }).select("+password")

        if (!user) {
            return errorHandler(NextResponse, 400, "Invalid credentials")
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return errorHandler(NextResponse, 400, "Invalid credentials")
        }

        const token = generateToken(user._id)

        const cookieData = await cookieSetter(token, true)
        const responseHeaders = {
            "Set-Cookie": cookieData,
        };

        return NextResponse.json({ message: `Welcome back, ${user ? user?.userName : ''}`, user }, { status: 201, headers: responseHeaders })
    } catch (error) {
        console.log(error)
    }
}

export const GET = async (req, res) => {
    const cookieData = await cookieSetter(null, false)
    return NextResponse.json(`Logged out successfully`, { status: 200, headers: { "Set-Cookie": cookieData } });

}