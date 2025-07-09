import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addFavorite, removeFavorite } from "../features/favorites/favoritesSlice";
import Modal from "./Modal";

interface Props {
    url: string;
    full: string;
    id: string;
    alt: string;
}

export default function ImageCard({ url, full, id, alt }: Props) {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((s) => s.auth);
    const isFav = useAppSelector((s) => s.favorites.items.some((i) => i.id === id)
    );

    const toggleFav = () => {
        if (!user) {
            alert("Добавлять в избранное могут только авторизованные пользователи.");
            return;
        }
        isFav
            ? dispatch(removeFavorite(id))
            : dispatch(addFavorite({ id, url, full, alt }));
    };

    return (
        <>
            <div className="relative group cursor-pointer" onClick={() => setOpen(true)}>
                <img src={url} alt={alt} className="w-full h-full object-cover rounded-lg" />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFav();
                    }}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                    {isFav ? "★" : "☆"}
                </button>
            </div>
            {open && <Modal img={full} alt={alt} onClose={() => setOpen(false)} />}
        </>
    );
}
