import { useEffect, useTransition } from "react";
import { authService } from "../../../services/authServices";
import { useNavigate } from "react-router";
import { useToast } from "../../../context/ToastContext";

const VerifyAccountPage: React.FC = () => {

    const navigate = useNavigate();
    const { addToast } = useToast();
    const [isPending, startTransition] = useTransition();
    const searchParams = new URLSearchParams(window.location.search);
    const emailFromQuery = searchParams.get("email") || "";
    const verifyIdFromQuery = searchParams.get("verifyId") || "";

    useEffect(() => {
        startTransition(async () => {
            try {
                await authService.verifyAccount({ email: emailFromQuery, verifyId: verifyIdFromQuery })
                addToast("Account verified successfully", "success")
                navigate("/login")
            } catch (error: any) {
                addToast("Account verified failed", "error")
                setTimeout(() => {
                    navigate("/register")
                }, 500)
            }
        })
    }, [])

    if (isPending) return <div className="text-center">Verifying your account. Please Wait...</div>

    return null;
};

export default VerifyAccountPage;
