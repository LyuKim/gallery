import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Image {
    id: string;
    urls: { small: string; regular: string };
    alt_description: string;
}

interface ImagesState {
    items: Image[];
    page: number;
    status: "idle" | "loading" | "failed";
    query: string;
}

const initialState: ImagesState = {
    items: [],
    page: 1,
    status: "idle",
    query: "nature",
};

export const fetchImages = createAsyncThunk(
    "images/fetch",
    async ({ page, query }: { page: number; query: string }) => {
        const res = await axios.get("https://api.unsplash.com/search/photos", {
            params: { query, page, per_page: 20 },
            headers: {
                Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
            },
        });
        return res.data.results as Image[];
    }
);

const imagesSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        reset(state) {
            state.items = [];
            state.page = 1;
        },
        setQuery(state, action) {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.status = "idle";
                const newItems = action.payload.filter(
                    (img) => !state.items.some((existing) => existing.id === img.id)
                );
                state.items.push(...newItems);
                state.page += 1;
            })
            .addCase(fetchImages.rejected, (state) => {
                state.status = "failed";
            });
    },
});
export const { reset, setQuery } = imagesSlice.actions;
export default imagesSlice.reducer;
