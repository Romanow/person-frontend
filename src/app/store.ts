import {configureStore} from '@reduxjs/toolkit';
import personsReducer from '../features/personsSlice.ts';

export const store = configureStore({
    reducer: {
        persons: personsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
