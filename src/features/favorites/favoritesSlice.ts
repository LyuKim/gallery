import { createSlice } from "@reduxjs/toolkit";
interface Fav { id: string; url: string; full: string; alt: string }

const initialState: { items: Fav[] } = { items: JSON.parse(localStorage.getItem("fav") || "[]") };

const slice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite(state, action) {
            state.items.push(action.payload);
            localStorage.setItem("fav", JSON.stringify(state.items));
        },
        removeFavorite(state, action) {
            state.items = state.items.filter((i) => i.id !== action.payload);
            localStorage.setItem("fav", JSON.stringify(state.items));
        },
    },
});
export const { addFavorite, removeFavorite } = slice.actions;
export default slice.reducer;
