import Cookies from 'js-cookie';
export const getToken = () => {
    const token = Cookies.get('authToken');

    return token;
};