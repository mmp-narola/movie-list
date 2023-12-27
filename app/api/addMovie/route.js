import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../../../helpers/error';
import dbConnect from '../../../helpers/db-connect';
import MovieModel from '../../../Models/Movie';


dbConnect()

export async function POST(req) {
    let { imageUrl, title, releasedYear } = await req.json()

    if (!imageUrl || !title || !releasedYear) {
        return errorHandler(NextResponse, 400, "Please enter all fields.")
    }
    let movie = await MovieModel.findOne({ title })
    if (movie) {
        return errorHandler(NextResponse, 400, "Movie already exists.")
    }
    const movies = new MovieModel({ imageUrl, title, releasedYear, user: '65892803c7918829765099f7' });
    movie = await movies.save();

    return NextResponse.json({ message: "Moive add successfully", movie }, { status: 201 });
}

export const GET = async (req, res) => {
    const searchParams = req.nextUrl.searchParams
    const page = searchParams.get('page');
    const pageSize = searchParams.get('pageSize');

    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);
    try {
        const [movies, totalMovies] = await Promise.all([
            MovieModel.find().skip(skip).limit(limit),
            MovieModel.countDocuments()
        ]);

        if (!movies || movies.length === 0) {
            return NextResponse.json({
                message: "Movie list is empty",
                movies: [],
                totalMovies: 0
            }, { status: 200 });
        }

        return NextResponse.json({
            movies,
            totalMovies
        }, { status: 200 });
    } catch (error) {
        return errorHandler(NextResponse, 500, "Internal Server Error");
    }
}



