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

export const getAllProducts = async () => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.get(`${URLAPI}/quiz/products/getall`, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
};

export const getProductByID = async (id) => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.get(`${URLAPI}/quiz/products/${id}`, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const getProductByName = async (value) => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.post(`${URLAPI}/quiz/products/search`, value, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const createProduct = async (data) => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        config.headers['Content-Type'] = 'multipart/form-data';
        const res = await http.post(`${URLAPI}/quiz/products/createformdata`, data, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const updateProduct = async (id, data) => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.put(`${URLAPI}/quiz/products/update/${id}`, data, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const deleteProduct = async (id) => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.remove(`${URLAPI}/quiz/products/delete/${id}`, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}
