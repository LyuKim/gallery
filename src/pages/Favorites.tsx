import { useAppSelector } from "../hooks/redux";
import ImageCard from "../components/ImageCard";

export default function Favorites() {
    const favs = useAppSelector((s) => s.favorites.items);
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {favs.map((img) => (
                <ImageCard key={img.id} id={img.id} url={img.url} full={img.full} alt={img.alt} />
            ))}
        </div>
    );
}
