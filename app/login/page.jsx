'use client'
import { saveTokenInLocalStorage } from '../../helpers/TokenHelper'
import { ApiHelper } from '../../helpers/ApiHelper'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const submitHandler = async (e) => {
        e.preventDefault()

        //currently we dont have registration page so I manually set usename and password
        try {
            e.preventDefault();
            const res = await ApiHelper.login({ email: 'mmp@narola.email', password: '123456' });
            if (res) {
                toast.success(res?.message)
                router.push('/')
            } else {
                toast.error(res?.error)
            }
        } catch (error) {
            console.log('error', error)
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
                            className="text-body-sm leading-body-sm bg-input text-white rounded-lg block w-full p-2.5 "
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
                            className="text-body-sm leading-body-sm bg-input text-white rounded-lg block w-full p-2.5 "
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
                    <button type="submit" className="w-full text-white bg-primary text-body-md rounded-lg leading-body-md px-5 py-2.5 text-center">Log In</button>
                </form>
            </div>
        </section >
    )
}

export default Login