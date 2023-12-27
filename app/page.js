'use client'
import { ApiHelper } from "../helpers/ApiHelper";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from '../Components/Loader'
import MovieCard from '../Components/MovieCard'
import Pagination from '../Components/Pagination'
import NoMovie from '../Components/NoMovie'

export default function Home() {
  const router = useRouter()

  const [moviesData, setMoviesData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 8;

  const totalPages = Math.ceil(moviesData?.totalMovies / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getMoviesData = async () => {
      setIsLoading(true);
      try {
        const res = await ApiHelper.getMovies(currentPage, pageSize);
        setMoviesData(res);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoading(false);
      }
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
    router.push('/movie')
  }

  return (
    <main className="min-h-screen items-center justify-between p-2 md:p-5 font-sans">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {moviesData?.movies?.length > 0 ?
            <div className="md:p-3 lg:p-6 xl:p-12">
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
                      onClick={() => router.push('/movie')}
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
                    <MovieCard movie={movie} index={index} key={movie._id} />
                  ))}
                </div>
              </div >
              {totalPages > 1 && (
                <div className="mt-5">
                  <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                </div>
              )}
            </div > :
            <NoMovie addMovieHandler={addMovieHandler} />
          }
        </>
      )}
    </main >
  )
}
