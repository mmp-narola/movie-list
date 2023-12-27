'use client'
import { ApiHelper } from "../helpers/ApiHelper";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const router = useRouter()

  const [moviesData, setMoviesData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const totalPages = Math.ceil(moviesData?.totalMovies / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getMoviesData = async () => {
      const res = await ApiHelper.getMovies(currentPage, pageSize);
      setMoviesData(res);
    };
    getMoviesData();
  }, [currentPage]);

  const logoutHandler = async () => {
    const res = await ApiHelper.logout()

    if (res) {
      router.push('/login');
    }
  }

  const addMovieHandler = () => {
    router.push('/addMovie')
  }

  return (
    <main className="min-h-screen items-center justify-between p-2 md:p-5 font-sans">
      {moviesData?.movies?.length > 0 ?
        <div className="px-24 py-12">
          <div className="flex justify-between">
            <div className="flex">
              <span className="xl:text-h2 lg:text-h2 lg:leading-h2 md:text-h3 md:leading-h3 sm:text-h3 sm:leading-h3 xs:text-h3 xs:leading-h3 text-white">
                My Movies
              </span>
              <button>
                <FiPlusCircle
                  size={24}
                  color="white"
                  className="mx-2 flex items-center"
                  onClick={() => router.push('/addMovie')}
                />
              </button>
            </div>
            <div className="flex">
              <span className=" text-white flex items-center cursor-pointer" onClick={logoutHandler}>
                <span className={`hidden sm:inline md:inline`}>Logout</span>
                <button >
                  <MdOutlineLogout
                    color="white"
                    className="mx-2 flex items-center"
                  />
                </button>
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="p-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-8">
              {moviesData?.movies?.map((movie, index) => (
                <div key={movie._id} className="p-1 bg-card rounded-lg flex flex-col justify-between" style={{ width: '282px', height: '504px' }}>
                  <Link href={`/addMovie/${movie._id}`} className="flex justify-center">
                    <Image
                      className='object-contain rounded-md'
                      style={{ width: '266px', height: '400px' }}
                      width={266}
                      height={400}
                      src={movie?.imageUrl ?? 'fallback-image-url'}
                      alt={`Card img cap${index}`}
                    />
                  </Link>
                  <div className="p-3">
                    <span className="mb-5 text-body-lg leading-h4 text-white">{movie.title}</span>
                    <p className="text-body-sm leading-h5 text-white">{movie.releasedYear}</p>
                  </div>
                </div>
              ))}
            </div>
          </div >
          {totalPages > 1 && (
            <div className="mt-5">
              <nav className="flex gap-2 justify-center text-white">
                <button
                  type="button"
                  className="min-w-7 rounded-md p-1"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`bg-card min-w-7 rounded-md p-1 ${index + 1 === currentPage ? 'bg-primary' : ''}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  type="button"
                  className="min-w-7 rounded-md p-1"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div > :
        <div className="flex flex-col items-center justify-center h-displayHeight text-center">
          <p className="mb-2 xl:text-h2 lg:text-h2 md:text-h3 sm:text-h3 xs:text-h3 leading-h2 text-white">Your movie list is empty</p>
          <button type="submit" className="text-white bg-primary rounded-lg text-h6 leading-h6 px-5 py-2.5 text-center " onClick={addMovieHandler}>Add a new movie</button>
        </div>
      }
    </main >
  )
}
