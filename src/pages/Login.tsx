import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { loginWithGoogle, logout } from "../features/auth/authSlice";

export default function Login() {
    const { user } = useAppSelector((s) => s.auth);
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col items-center gap-4 mt-20">
            {!user ? (
                <button className="btn" onClick={() => dispatch(loginWithGoogle())}>
                    Войти через Google
                </button>
            ) : (
                <>
                    <p>Привет, {user.displayName}</p>
                    <button className="btn" onClick={() => dispatch(logout())}>Выйти</button>
                </>
            )}
        </div>
    );
}
