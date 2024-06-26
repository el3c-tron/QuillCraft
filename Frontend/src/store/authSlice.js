import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : null,
    userData : null,
    tempLikes : 0,
    tempBookmarks : 0
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login : (state, action) => {
            state.status = true;
            state.userData = action.payload.userData
        },
        logout : (state) => {
            state.status = false,
            state.userData = null
        },
        changeLikeCount : (state, action) => {
            state.tempLikes += 1
        },
        changeBookmarkCount : (state, action) => {
            state.tempBookmarks += 1
        }
    }
});

export const {login, logout, changeBookmarkCount, changeLikeCount} = authSlice.actions;
export default authSlice.reducer;