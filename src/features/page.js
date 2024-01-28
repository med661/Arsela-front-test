import { createSlice } from '@reduxjs/toolkit';

import { createPage, getPages } from '../service/pageService';



export const pageSlice = createSlice({
    name: 'pages',
    initialState: {
        pages: [],
        loading: false,
        error: false,
    },
    reducers: {
        createPageRequest: (state) => {
            state.loading = true;
        },
        createPageSuccess: (state, action) => {
            state.loading = false;
            state.pages.push(action.payload);
        },
        createPageFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        getPagesRequest: (state) => {
            state.loading = true;
        },
        getPagesSuccess: (state, action) => {
            state.loading = false;
            state.pages = action.payload;
        },
        getPagesFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
    },
});

export const createPageAsync = (page) => async (dispatch) => {
    try {
        dispatch(createPageRequest());
        const createdPage = await createPage(page);
        dispatch(createPageSuccess(createdPage));
    } catch (error) {
        dispatch(createPageFailure());
    }
};

export const getPagesAsync = () => async (dispatch) => {
    try {
        dispatch(getPagesRequest());
        const pages = await getPages();
        dispatch(getPagesSuccess(pages));
    } catch (error) {
        dispatch(getPagesFailure());
    }
};

export const {
    createPageRequest,
    createPageSuccess,
    createPageFailure,
    getPagesRequest,
    getPagesSuccess,
    getPagesFailure,
} = pageSlice.actions;

export default pageSlice.reducer;
