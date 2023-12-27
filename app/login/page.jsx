'use client'
import { saveTokenInLocalStorage } from '../../helpers/TokenHelper'
import { ApiHelper } from '../../helpers/ApiHelper'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const submitHandler = async (e) => {
        e.preventDefault()
        const res = await ApiHelper.login({ email, password })
        if (res) {
            router.push("/")
        }
    }

    return (
        <section className="font-sans">
            <div className="flex flex-col lg:max-w-md md:max-w-md sm:max-w-sm max-w-xs justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className="text-h1 text-white text-center leading-h1 mb-8">
                    Sign in
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-input text-white sm:text-sm rounded-lg block w-full p-2.5"
                            placeholder="name@company.com" required="" />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-input text-white sm:text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="rounded bg-input "
                                required="" />
                        </div>
                        <label htmlFor="remember" className="ml-2 leading-h5 text-body-sm text-white">
                            Remember me
                        </label>
                    </div>
                    <button type="submit" className="w-full text-white bg-primary hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log In</button>
                </form>
            </div>
        </section >
    )
}

export default Login