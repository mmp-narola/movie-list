'use client'
import { useRouter } from 'next/navigation'
import { ApiHelper } from '../../helpers/ApiHelper'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'


const AddMovie = ({ params }) => {
    const isEditMode = params.movieId ? true : false
    const movieId = params.movieId
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [releasedYear, setReleaseYear] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);
    const [editableMovie, setEditableMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMovie = async (movieId) => {
            if (isEditMode) {
                try {
                    const response = await ApiHelper.getMovieById(movieId);
                    setEditableMovie(response);
                } catch (error) {
                    console.error('Failed to fetch movie details:', error);
                }
            }
        }

        getMovie(movieId)
    }, [movieId, isEditMode]);

    const submitHandler = async (e) => {
        e.preventDefault()
        const updatedData = {
            title: title || editableMovie?.title,
            releasedYear: releasedYear || editableMovie?.releasedYear,
            imageUrl: selectedImage ? await uploadImage(selectedImage) : editableMovie?.imageUrl,
        };
        setIsLoading(true)
        try {
            if (isEditMode) {
                const res = await ApiHelper.updateMovie(movieId, updatedData);
                toast.success(res?.message);
                setIsLoading(false)
                router.push('/');
            } else {
                const imageUrl = await uploadImage(selectedImage);
                const res = await ApiHelper.addMovie({ title, releasedYear, imageUrl });
                toast.success(res?.message);
                setIsLoading(false)
                router.push('/');
            }
        } catch (error) {
            setIsLoading(false)
            toast.error(error?.response?.data);
        }
    }

    const uploadImage = async (img) => {
        const data = new FormData();
        data.append('file', img);
        data.append('upload_preset', 'mystore');
        data.append('cloud_name', 'mambpc');

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/mambpc/image/upload', {
                method: 'POST',
                body: data,
            });
            const imageUrl = await response.json();
            return imageUrl.url;
        } catch (error) {
            console.error('Failed to upload image:', error);
        }
    };

    const imageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const fileInputRef = useRef(null);

    const imagePreviewClickHandler = () => {
        fileInputRef.current.click();
    };

    const imagePreview = selectedImage || editableMovie ? (
        <img
            key={selectedImage ? selectedImage.name : editableMovie?.imageUrl}
            className='rounded-lg'
            src={selectedImage ? URL.createObjectURL(selectedImage) : editableMovie?.imageUrl}
            alt="Thumb"
            style={{ width: '100%', height: '473px', objectFit: 'contain' }}
        />
    ) : (
        <div className="flex flex-col items-center justify-center pt-5 pb-6"
            style={{ width: '100%', height: '473px' }}
        >
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Click to add an image.</p>
        </div>
    );


    return (
        // <section className="font-sans">
        <div className='sm:w-full p-5 md:p-5 lg:p-8 xl:p-12' style={{ minHeight: 'calc(100vh - 92px)' }}>
            <p className='text-h3 leading-h3 lg:text-h2 lg:leading-h2 sm:text-h3 sm:leading-h3 md:text-h3 md:leading-h3 text-white mb-10'>{isEditMode ? "Edit" : "Create a new movie"}</p>
            <form onSubmit={submitHandler}>
                <div className='flex gap-5 flex-col sm:flex-row'>

                    <div
                        onClick={imagePreviewClickHandler}
                        className="flex flex-col items-center justify-center border border-white border-dashed rounded-lg mb-2 bg-input cursor-pointer md:w-full basis-1/2 p-3"
                    // style={{ maxWidth: '100%', md: { maxWidth: '50%' } }}
                    // style={{ width: '100%', height: 'auto' }}
                    >
                        {imagePreview}
                    </div>

                    <input
                        ref={fileInputRef}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={imageChange}
                    />


                    <div className='flex flex-col gap-5 md:w-2/5 w-full '>
                        <div className='flex flex-col gap-3'>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                defaultValue={editableMovie?.title}
                                placeholder="Title"
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-input text-white text-body-sm leading-body-sm rounded-lg block w-full p-2.5"
                            />

                            <input
                                type="number"
                                name="releaseYear"
                                id="releaseYear"
                                defaultValue={editableMovie?.releasedYear}
                                placeholder="Publishing year"
                                onChange={(e) => setReleaseYear(e.target.value)}
                                className="bg-input sm:w-2/3 text-white text-body-sm leading-body-sm rounded-lg block p-2.5"
                            />
                        </div>

                        <div className='flex gap-2'>
                            <button type="button" className="w-full text-white bg-background border border-white text-body-md rounded-lg leading-body-md px-5 py-2.5 text-center "
                                onClick={() => router.push('/')}
                            >Cancel</button>
                            <button type="submit" disabled={isLoading} className="w-full text-white bg-primary border border-white text-body-md rounded-lg leading-body-md px-5 py-2.5 text-center ">{isLoading ? 'Loading...' : editableMovie ? "Update" : "Submit"}</button>
                        </div>
                    </div>

                </div>
            </form >
        </div >
        // </section>
    )
}

export default AddMovie