import mongoose from "mongoose";

function dbConnect() {
    mongoose.set('strictQuery', true)
    if (mongoose.connections[0].readyState) {
        console.log('Already connected with database');
        return
    }
    mongoose.connect(process.env.MONGODB_URL)
    mongoose.connection.on('connected', () => {
        console.log("Connected with database.")
    })
    mongoose.connection.on('error', (error) => {
        console.log("Error while connecting", error)
    })
}


export default dbConnect