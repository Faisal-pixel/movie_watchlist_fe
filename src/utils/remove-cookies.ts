import Cookies from "js-cookie";

const removeCookie = (key: string) => {
    Cookies.remove(key);
}

export default removeCookie;