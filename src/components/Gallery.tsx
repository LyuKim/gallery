import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchImages } from "../features/images/imagesSlice";
import ImageCard from "./ImageCard";

export default function Gallery() {
    const { items, page, query, status } = useAppSelector((s) => s.images);
    const dispatch = useAppDispatch();
    const sentinel = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // первый запрос
        if (items.length === 0 && query) dispatch(fetchImages({ page: 1, query }));
    }, [query]);

    useEffect(() => {
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && status === "idle") {
                dispatch(fetchImages({ page, query }));
            }
        });
        if (sentinel.current) obs.observe(sentinel.current);
        return () => obs.disconnect();
    }, [sentinel, page, query, status]);

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
                {items.map((img) => (
                    <ImageCard
                        key={img.id}
                        id={img.id}
                        url={img.urls.small}
                        full={img.urls.regular}
                        alt={img.alt_description}
                    />
                ))}
            </div>
            <div ref={sentinel} className="h-1" />
        </>
    );
}
