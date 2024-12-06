import Cookies from "js-cookie";

const setCookie = (key: string, value: string, expiresIn: number ) => {
    Cookies.set(key, value, { expires: expiresIn });
    return true;
}

export default setCookie;