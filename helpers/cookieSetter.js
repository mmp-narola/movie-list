import { serialize } from "cookie";

export const cookieSetter = async (token, set) => {

    const seralized = serialize('token', set ? token : "", {
        httpOnly: true,
        // sameSite: "strict",
        maxAge: set ? 1 * 24 * 60 * 60 * 1000 : 0,
        path: "/",
    });

    return seralized
};
