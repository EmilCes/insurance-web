
import { useAuth } from "@/lib/auth/authContext";

const LogoutButton = () => {
    const { logout } = useAuth();

    return (
        <button
            onClick={logout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-6"
            >
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;
