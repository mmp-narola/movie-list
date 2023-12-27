import React from 'react'

const NoMovie = ({ addMovieHandler }) => {
    return (
        <div className="flex flex-col items-center justify-center h-displayHeight text-center">
            <p className="mb-2 xl:text-h2 lg:text-h2 md:text-h3 sm:text-h3 xs:text-h3 leading-h2 text-white">Your movie list is empty</p>
            <button type="submit" className="text-white bg-primary rounded-lg text-h6 leading-h6 px-5 py-2.5 text-center " onClick={addMovieHandler}>Add a new movie</button>
        </div>
    )
}

export default NoMovie