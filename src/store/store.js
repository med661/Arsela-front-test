import { configureStore } from '@reduxjs/toolkit';
import pageSlice from '../features/page';

export default configureStore({
    reducer: {
        page: pageSlice,
    },
});