import SearchBar from "../components/SearchBar";
import Gallery from "../components/Gallery";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function Home() {
    return (
        <div className="py-6 space-y-6">
            <SearchBar />
            <Gallery />
            <ScrollToTopButton />
        </div>
    );
}
