import Cookies from "js-cookie";

const setCookie = (key: string, value: string, expiresIn: number ) => {
    Cookies.set(key, value, { 
        expires: expiresIn,
        path: "/",
    });
    return true;
}

export default setCookie;