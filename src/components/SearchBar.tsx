import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../hooks/redux";
import { reset, setQuery, fetchImages } from "../features/images/imagesSlice";

export default function SearchBar() {
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
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
            <button className="btn" type="submit">Найти</button>
        </form>
    );
}
