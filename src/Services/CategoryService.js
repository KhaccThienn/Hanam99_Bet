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

export const getAllCategories = async () => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.get(`${URLAPI}/quiz/categories/getall`, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
};

export const getCategoryByID = async (id) => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.get(`${URLAPI}/quiz/categories/${id}`, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const getCategoryByName = async (value) => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.post(`${URLAPI}/quiz/categories/search`, value, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const createCategory = async (data) => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.post(`${URLAPI}/quiz/categories`, data, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const updateCategory = async (id, data) => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.put(`${URLAPI}/quiz/categories/update/${id}`, data, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const deleteCategory = async (id) => {
    try {
        config.headers['Authorization'] = `Bearer ${getCookieLocalStorage()}`;
        const res = await http.remove(`${URLAPI}/quiz/categories/delete/${id}`, config);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}
