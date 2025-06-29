import { useState, useTransition, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { useToast } from "../../../context/ToastContext";
import { authService } from "../../../services/authServices";

const LoginPage: React.FC = () => {

    const navigate = useNavigate();
    const { addToast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState({
        email: ""
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleLogin = () => {
        // e.preventDefault();
        // Simulate login process
        console.log('Login data:', formData);
        startTransition(async () => {
            try {
                const response = await authService.login(formData);
                console.log("====> Response", { response });
                addToast(response.message, "success")
                navigate("/verify-otp?email="+formData.email);
            } catch (error: any) {
                console.error("====> Error", { error })
                addToast(error?.message || "Failed to Register Account ", "error")
            }
        })
        // setCurrentPage('verify-otp');
    };

    const navigateToRegister = () => {
        navigate("/register")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            {/* <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                            <span className="material-symbols-outlined absolute left-3 top-3/7 transform -translate-y-1/2 text-gray-400 w-5 h-5">
                                mail
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                        Sign In
                    </button>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <button
                            onClick={navigateToRegister}
                            disabled={isPending}
                            className="text-purple-600 hover:text-purple-800 font-semibold"
                        >
                            Create Account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
