import * as http from "../Common/http";

const URLAPI = "https://api.hanam88.com";

const getCookieLocalStorage = () => {
    const accessToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
    return accessToken ? accessToken.replace(/"/g, "") : null;
}

//get token in cookie
const getCookie = (name) => {
    const cookieValue = document.cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)') || null;
    return cookieValue ? cookieValue.pop() : null;
}

const config = {
    baseURL: "https://api.hanam88.com",
    headers: {
        Authorization: `Bearer ${getCookieLocalStorage() ? getCookieLocalStorage() : getCookie('access_token')}`,
        "Content-Type": "application/json"
    },
}

export const login = async (data) => {
    try {
        const res = await http.post(`${URLAPI}/quiz/accounts/login`, data);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const changePassword = async (data) => {
    try {
        const res = await http.post(`${URLAPI}/quiz/accounts/changepassword`, data, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const logout = async () => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.get(`${URLAPI}/quiz/accounts/logout`, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}