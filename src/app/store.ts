import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "../features/images/imagesSlice.ts";
import authReducer from "../features/auth/authSlice.ts";
import favoritesReducer from "../features/favorites/favoritesSlice.ts";

export const store = configureStore({
    reducer: {
        images: imagesReducer,
        auth: authReducer,
        favorites: favoritesReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
