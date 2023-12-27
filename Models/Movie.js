import mongoose, { models, model } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    releasedYear: { type: String, required: true },
    imageUrl: { type: String },
    user: { type: ObjectId, ref: 'Register' },
}, {
    timestamps: true
})

const MovieModel = models.Movie || model('Movie', movieSchema)

export default MovieModel