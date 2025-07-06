import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { reset, setQuery, fetchImages } from "../features/images/imagesSlice";

export default function SearchBar() {
    const currentQuery = useAppSelector((s) => s.images.query);
    const [text, setText] = useState(currentQuery);
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
                className="input input-bordered w-1/2"
                placeholder="Поиск изображений..."
                value={text}
                onChange={(e) => setText(e.target.value)}
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
