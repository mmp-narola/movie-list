import MovieModel from '../../../../Models/Movie';
import dbConnect from '../../../../helpers/db-connect';
import { NextResponse } from 'next/server';

dbConnect()

export async function GET(req, { params }) {
    const movieId = await params.movieId
    try {
        const editableMovie = await MovieModel.findOne({ _id: movieId })
        return NextResponse.json(editableMovie)
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong." });
    }
}

export async function PUT(req, res) {
    const movieId = await res.params.movieId
    const { title, releasedYear, imageUrl } = await req.json()

    try {
        const updatedMovie = await MovieModel.findOneAndUpdate(
            { _id: movieId },
            { $set: { title, releasedYear, imageUrl } },
            { returnOriginal: false }
        );
        return NextResponse.json({ message: "Movie updated successfully", updatedMovie })
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while update" });
    }
}