'use client'
export const tokenName = 'authToken'

export const saveTokenInLocalStorage = (token) => {
    localStorage.setItem(tokenName, JSON.stringify(token))
}

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem(tokenName)
}

export const getTokenFromLocalStorage = () => {
    const token = JSON.parse(localStorage.getItem(tokenName))
    return token
}