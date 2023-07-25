import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();


//get token in cookie
const getCookie = (name) => {
    const cookieValue = document.cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)') || null;
    return cookieValue ? cookieValue.pop() : null;
}

const getCookieLocalStorage = () => {
    const accessToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
    return accessToken ? accessToken : "hehehehe";
}

export const axiosInstance = axios.create(
    {
        baseURL: "https://api.hanam88.com",
        headers: {
            Authorization: `Bearer ${getCookieLocalStorage()}`
        }
    }
);

//default url
axiosInstance.defaults.baseURL = 'https://api.hanam88.com'

axios.interceptors.request.use(async (config) => {
    // Check if the access token is valid
    const token = getCookie('access_token') ? getCookie('access_token') : getCookieLocalStorage();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        // The access token is not valid, so refresh it
        const newToken = await refreshToken();
        cookies.set('access_token', newToken.accesstoken, { maxAge: 100000000000 });
        cookies.set('refresh_token', newToken.refreshtoken, { maxAge: 100000000000 });
        config.headers['Authorization'] = `Bearer ${newToken.accesstoken}`;
    }

    return config;
});

// Refresh the access token
async function refreshToken() {
    const tokens = {
        accesstoken: getCookie('access_token'),
        refreshtoken: getCookie('refresh_token')
    }
    // Make a request to the API to refresh the access token
    const response = await axiosInstance.post('/quiz/accounts/refreshtoken', tokens);

    // Get the new access token from the response
    const newToken = response.data;

    // Return the new access token
    return newToken;
}

//response
axiosInstance.interceptors.response.use(config => {
    console.log(getCookie('access_token'));
    config.headers.Authorization = `Bearer ${getCookie('access_token')}`;
    return config;
},
    error => {
        return Promise.reject(error);
    }
)

export const get = async (URL, config = {}) => {
    const res = await axiosInstance.get(URL, config);
    return res.data;
}

export const post = async (URL, data, config = {}) => {

    const res = await axiosInstance.post(URL, data, config);
    return res.data;
}

export const put = async (URL, data, config = {}) => {
    const res = await axiosInstance.put(URL, data, config);
    return res.data;
};

export const remove = async (URL, config = {}) => {
    const res = await axiosInstance.delete(URL, config);
    return res.data;
}