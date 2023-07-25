import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.key(0) ? JSON.parse(localStorage.getItem("user_data")) : {};

const setItemFunction = (item) => {
    localStorage.setItem("user_data", JSON.stringify(item));
    localStorage.setItem("access_token", JSON.stringify(item.accesstoken));
    localStorage.setItem("refresh_token", JSON.stringify(item.refreshtoken));
}

const initState = {
    user: userData,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            setItemFunction(state.user);
        },
        getUser: (state, action) => {
            return {
                ...state.user
            }
        },
    }
});

export const { setUser } = userSlice.actions;
export const selectUserData = (state) => state.user;
export default userSlice.reducer;