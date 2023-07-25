import axios from "axios";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

const cookies = new Cookies();

//get token in cookie
const getCookie = (name) => {
    const cookieValue = document.cookie.match(/(^|;)\\s*' + name + '\\s*=\\s*([^;]+)/) || null;
    return cookieValue ? cookieValue[1] : null;
}

// get accesstoken in localStorage
const getAccessTokenLocalStorage = () => {
    const accessToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
    return accessToken ? accessToken : null;
}

const getRefreshTokenLocalStorage = () => {
    const refresh_token = localStorage.getItem('refresh_token') ? localStorage.getItem('refresh_token') : null;
    return refresh_token ? refresh_token : null;
}

// config ve baseURL API va header
export const axiosInstance = axios.create(
    {
        baseURL: "https://api.hanam88.com",
        // withCredentials: true,
        headers: {
            Authorization: `Bearer ${getAccessTokenLocalStorage()}`,
            "Content-Type": "application/json"
        }
    }
);

//default url
axiosInstance.defaults.baseURL = 'https://api.hanam88.com'

axios.interceptors.request.use(async (config) => {

    
    // Check if the access token is valid
    const token = getCookie('access_token') ? getCookie('access_token') : getAccessTokenLocalStorage();
    const access_token = jwtDecode(token)
    console.log(access_token);
    const now = Math.floor(new Date().getTime() / 1000);

    if (token) {
        const access_token = jwtDecode(getCookie('access_token'))
        const now = Math.floor(new Date().getTime() / 1000);
        console.log('now', now, 'access token', access_token.exp);
        if (access_token.exp <= now) {
            console.log('refresh..');
            const choose = await Swal.fire({
                title: "Session Has Expired, Please Login Again",
                confirmButtonText: "OK",
            });
            if (choose.isConfirmed) {
                await refreshToken()
            }
        }
    }

    if (access_token.exp >= now) {
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
const refreshToken = async () => {
    const tokens = {
        accesstoken: getCookie('access_token') ? getCookie('access_token') : getAccessTokenLocalStorage(),
        refreshtoken: getCookie('refresh_token') ? getCookie('refresh_token') : getRefreshTokenLocalStorage()
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
    const token = getCookie('access_token') ? getCookie('access_token') : getAccessTokenLocalStorage();
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
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
