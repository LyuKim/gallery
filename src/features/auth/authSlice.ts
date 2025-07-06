import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleAuthProvider, type User, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const loginWithGoogle = createAsyncThunk("auth/google", async () => {
    const res = await signInWithPopup(auth, provider);
    return res.user;
});

export const logout = createAsyncThunk("auth/logout", async () => {
    await signOut(auth);
});

interface AuthState {
    user: User | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

onAuthStateChanged(auth, (user) => {
});
export default authSlice.reducer;
