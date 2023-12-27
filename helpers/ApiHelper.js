import { makeAPICall } from "./AxiosHelper";

const login = (values) => {
    const apiData = { option: { method: 'POST', url: `/login` }, data: values }
    return makeAPICall(apiData)
}

const register = (values) => {
    const apiData = { option: { method: 'POST', url: `/register` }, data: values }
    return makeAPICall(apiData)
}

const getProfile = () => {
    const apiData = { option: { method: 'GET', url: `/me` } }
    return makeAPICall(apiData)
}

const logout = () => {
    const apiData = { option: { method: 'GET', url: `/login` } }
    return makeAPICall(apiData)
}

const addMovie = (values) => {
    const apiData = { option: { method: 'POST', url: `/addMovie` }, data: values }
    return makeAPICall(apiData)
}

const getMovies = (currentPage, pageSize) => {
    const apiData = { option: { method: 'GET', url: `/addMovie?page=${currentPage}&pageSize=${pageSize}` } }
    return makeAPICall(apiData)
}

const getMovieById = (movieId) => {
    const apiData = { option: { method: 'GET', url: `/addMovie/${movieId}` } }
    return makeAPICall(apiData)
}

const updateMovie = (movieId, values) => {
    const apiData = { option: { method: 'PUT', url: `/addMovie/${movieId}` }, data: values }
    return makeAPICall(apiData)
}



export const ApiHelper = { login, register, getProfile, logout, addMovie, getMovies, getMovieById, updateMovie }