import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export default function Navbar() {
    const { user } = useAppSelector((s) => s.auth);

    return (
        <nav className="flex items-center justify-between px-6 py-4 shadow-md">
            <Link to="/" className="text-xl font-bold">Image Gallery</Link>
            <div className="flex gap-4">
                <NavLink to="/" end className={({ isActive }) => isActive ? "font-semibold" : ""}>Главная</NavLink>
                <NavLink to="/favorites" className={({ isActive }) => isActive ? "font-semibold" : ""}>Избранное</NavLink>
                {user ? (
                    <NavLink to="/login" className="text-blue-600">Привет, {user.displayName?.split(" ")[0]}</NavLink>) : (
                    <NavLink to="/login" className="text-blue-600">Войти</NavLink>
                )}
            </div>
        </nav>
    );
}
