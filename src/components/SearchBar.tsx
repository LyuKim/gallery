import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { reset, setQuery, fetchImages } from "../features/images/imagesSlice";

export default function SearchBar() {
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        dispatch(reset());
        dispatch(setQuery(text));
        dispatch(fetchImages({ page: 1, query: text }));
    };

    return (
        <form onSubmit={onSubmit} className="flex justify-center mb-4 gap-2">
            <input
                type="text"
                placeholder="Поиск изображений..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Найти
            </button>
        </form>
    );
}
