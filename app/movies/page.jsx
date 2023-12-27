'use client'
import { ApiHelper } from "../../helpers/ApiHelper";
import { FaCirclePlus } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    const router = useRouter()
    const [moviesData, setMoviesData] = useState(null)

    const logoutHandler = async () => {
        const res = await ApiHelper.logout()
    }

    useEffect(() => {
        const getMoviesData = async () => {
            const res = await ApiHelper.getMovies()
            setMoviesData(res)
        }
        getMoviesData()
    }, [])

    const addMovieHandler = () => {
        router.push('/addMovie')
    }

    return (
        <main className="min-h-screen items-center justify-between p-24">
            {moviesData?.length > 0 ?
                <div>
                    <div className="flex justify-between">
                        <div className="flex">
                            <span className="text-h2 text-white">
                                My Movies
                            </span>
                            <button>
                                <FaCirclePlus color="white" className="mx-2 flex items-center" onClick={() => router.push('/addMovie')} />
                            </button>
                        </div>
                        <div className="flex">
                            <span className=" text-white flex items-center">
                                Logout
                            </span>
                            <button onClick={logoutHandler}>
                                <MdOutlineLogout color="white" className="mx-2 flex items-center" />
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="p-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 xl:gap-y-8">
                            {moviesData.map((movie, index) => (
                                <div className="p-1 border">
                                    <Image
                                        className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                                        width={266}
                                        height={400}
                                        style={{ objectFit: 'scale-down', height: '266px', width: '400px' }}
                                        src={movie?.imageUrl ?? 'fallback-image-url'}
                                        alt={`Card img cap${index}`}
                                    />
                                    <div className="p-3">
                                        <span className="mb-5 text-h6 text-white">{movie.title}</span>
                                        <p className="text-white">{movie.releasedYear}</p>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div> :
                <div className="flex-col w-2/5" >
                    <p className="mb-2">Your movie list is empty</p>
                    <button type="submit" className="text-white bg-primary hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={addMovieHandler}>Add a new movie</button>
                </div>}
        </main>
    )
}
