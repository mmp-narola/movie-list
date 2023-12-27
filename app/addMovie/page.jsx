'use client'
import { useRouter } from 'next/navigation'
import { ApiHelper } from '../../helpers/ApiHelper'
import React, { useEffect, useState } from 'react'


const AddMovie = ({ params }) => {
    const isEditMode = params.movieId ? true : false
    const movieId = params.movieId
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [releasedYear, setReleaseYear] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);
    const [editableMovie, setEditableMovie] = useState(null);

    useEffect(() => {
        const getMovie = async (movieId) => {
            if (isEditMode) {
                const response = await ApiHelper.getMovieById(movieId)
                if (response) {
                    setEditableMovie(response)
                } else {
                    throw new Error("Failed to create a topic");
                }
            }
        }

        getMovie(movieId)
    }, [movieId])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (isEditMode) {
            const updatedData = {
                title: title || editableMovie.title,
                releasedYear: releasedYear || editableMovie.releasedYear,
                imageUrl: selectedImage ? await uploadImage(selectedImage) : editableMovie.imageUrl,
            }
            try {
                const res = await ApiHelper.updateMovie(movieId, updatedData)
                alert(res?.message)
                router.push('/')
            } catch (error) {
                alert(error?.response?.data)
            }
        } else {
            const imageUrl = await uploadImage(selectedImage)
            try {
                const res = await ApiHelper.addMovie({ title, releasedYear, imageUrl })
                alert(res?.message)
                router.push('/')
            } catch (error) {
                alert(error?.response?.data)
            }
        }


    }

    const uploadImage = async (img) => {
        const data = new FormData()
        data.append('file', img)
        data.append('upload_preset', 'mystore')
        data.append('cloud_name', 'mambpc')
        const response = await fetch('https://api.cloudinary.com/v1_1/mambpc/image/upload', {
            method: 'POST',
            body: data
        })
        const imageUrl = await response.json()
        return imageUrl.url
    }

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-2/3 px-24 py-12'>
                {/* <div className='w-full'> */}
                <p className='xs:text-h2 lg:text-h2 lg:leading-h2 sm:text-h4 sm:leading-h4 md:text-h3 md:leading-h3 text-white mb-10'>Create a new movie</p>
                {/* </div> */}
                <form onSubmit={submitHandler}>
                    <div className='flex justify-between'>
                        <div className="flex flex-col" >
                            {(selectedImage || editableMovie) ?
                                <img
                                    key={selectedImage ? selectedImage.name : editableMovie?.imageUrl}
                                    className='h-full w-full object-cover object-center lg:h-full lg:w-full mb-2 rounded-lg'
                                    src={selectedImage ? URL.createObjectURL(selectedImage) : editableMovie?.imageUrl}
                                    alt="Thumb"
                                    style={{ height: '504px', width: '473px' }}
                                /> :
                                <div className="border border-white border-dashed rounded-lg mb-2 bg-input" style={{ height: '504px', width: "473px", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Drop an image here.</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </div>
                            }
                            <input accept="image/*" type="file" name="img" onChange={imageChange} />
                        </div>


                        <div className='flex flex-col w-2/5 gap-10'>
                            <div className='flex flex-col gap-2'>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    // value={title}
                                    defaultValue={editableMovie?.title}
                                    placeholder="Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="bg-input text-white sm:text-sm rounded-lg block w-full p-2.5"
                                />

                                <input
                                    type="number"
                                    name="releaseYear"
                                    id="releaseYear"
                                    // value={releasedYear}
                                    defaultValue={editableMovie?.releasedYear}
                                    placeholder="Publishing year"
                                    onChange={(e) => setReleaseYear(e.target.value)}
                                    className="bg-input w-2/3 text-white sm:text-sm rounded-lg block p-2.5"
                                />
                            </div>

                            <div className='flex gap-2'>
                                <button type="button" className="w-full text-white bg-background border border-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                    onClick={() => router.push('/')}
                                >Cancel</button>
                                <button type="submit" className="w-full text-white bg-primary border border-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">{editableMovie ? "Update" : "Submit"}</button>
                            </div>
                        </div>
                    </div>
                </form >
            </div >
        </div>
    )
}

export default AddMovie