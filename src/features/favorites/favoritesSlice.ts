import { createSlice, type PayloadAction } from "@reduxjs/toolkit"; 
import { loginWithGoogle, logout } from "../auth/authSlice";

interface FavItem {
    id: string;
    url: string;
    full: string;
    alt: string;
}

interface FavState {
    items: FavItem[];
    userId: string | null;
}

const initialState: FavState = {
    items: [],
    userId: null,
};

function storageKey(uid: string) {
    return `fav_${uid}`;
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<FavItem>) {
            if (!state.userId) return; // защита
            state.items.push(action.payload); localStorage.setItem(storageKey(state.userId), JSON.stringify(state.items));
        },

        removeFavorite(state, action: PayloadAction<string>) {
            if (!state.userId) return;
            state.items = state.items.filter((i) => i.id !== action.payload); localStorage.setItem(storageKey(state.userId), JSON.stringify(state.items));
        },
    },

    extraReducers: (builder) => {
        // логин — подгружаем сохранённые избранные этого пользователя
        builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
            const uid = action.payload.uid;
            state.userId = uid;
            state.items = JSON.parse(localStorage.getItem(storageKey(uid)) || "[]");
        });
        // логаут — сохраняем и чистим лоĸальное состояние
        builder.addCase(logout.fulfilled, (state) => {
            if (state.userId) {
                localStorage.setItem(storageKey(state.userId), JSON.stringify(state.items));
            }
            state.items = [];
            state.userId = null;
        });
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// interface Fav { id: string; url: string; full: string; alt: string }

// const initialState: { items: Fav[] } = { items: JSON.parse(localStorage.getItem("fav") || "[]") };

// const slice = createSlice({
//     name: "favorites",
//     initialState,
//     reducers: {
//         addFavorite(state, action) {
//             state.items.push(action.payload);
//             localStorage.setItem("fav", JSON.stringify(state.items));
//         },
//         removeFavorite(state, action) {
//             state.items = state.items.filter((i) => i.id !== action.payload);
//             localStorage.setItem("fav", JSON.stringify(state.items));
//         },
//     },
// });
// export const { addFavorite, removeFavorite } = slice.actions;
// export default slice.reducer;
