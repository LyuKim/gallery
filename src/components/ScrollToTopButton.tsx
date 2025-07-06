import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    
    if (!visible) return null;
    return (
        <button
            className="fixed bottom-8 right-8 btn btn-primary"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >↑ Наверх
        </button>
    );
}
