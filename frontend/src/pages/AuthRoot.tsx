import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect, useTransition } from "react";
import { authService } from "../services/authServices";
import { useToast } from "../context/ToastContext";

const AuthRoot: React.FC = () => {

    const { user, login } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!user?.id) {
            startTransition(async () => {
                try {
                    const response = await authService.getUserDetails();
    
                    console.log("Response:", { response });
                    login(response.user);
                } catch (error: any) {
                    addToast("User not logged in", "info")
                    navigate("/login")
                }
            })
        }
    }, []);

    if (isPending || !user?.id) return <div>Fetching user details...</div>;

    return <Outlet />
};

export default AuthRoot;

