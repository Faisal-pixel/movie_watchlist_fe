import Cookies from "js-cookie";

const getCookie = (key: string) => {
    const cookie = Cookies.get(key);
    return cookie ? cookie : null;
}

export default getCookie;