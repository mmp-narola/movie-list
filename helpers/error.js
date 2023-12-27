export const errorHandler = (res, statusCode = 500, message = "Internal server error") => {
    return res.json(message, { status: statusCode })
}

