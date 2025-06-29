import { useState, useTransition, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { authService } from "../../../services/authServices";
import { useToast } from "../../../context/ToastContext";

const VerifyOTPPage: React.FC = () => {
    
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [isPending, startTransition] = useTransition();

    const searchParams = new URLSearchParams(window.location.search);
    const emailFromQuery = searchParams.get("email") || "";

    const [formData, setFormData] = useState({
        email: emailFromQuery,
        otp: ""
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleVerifyOTP = () => {
        console.log('OTP data:', formData);
        startTransition(async () => {
            try {
                await authService.verifyOTP(formData);
                addToast("Login Successfull", "success");
                navigate("/");
            } catch (error: any) {
                console.log('===> error:', { error });
                addToast(error?.message || "Failed to verify OTP")
                navigate("/org")
            }
        })
    }

    const navigateToRegister = () => {
        navigate("/register")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined w-8 h-8 text-green-600">
                            call
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
                    <p className="text-gray-600">
                        We've sent a verification code to<br />
                        <span className="font-semibold text-gray-900">{formData.email}</span>
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                            Enter Verification Code
                        </label>
                        <input
                            type="text"
                            name="otp"
                            value={formData.otp}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center text-2xl font-bold tracking-widest"
                            placeholder="000000"
                            maxLength={6}
                            required
                        />
                    </div>

                    <button
                        type="button"
                        disabled={isPending}
                        onClick={handleVerifyOTP}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                        Verify Account
                    </button>
                </div>
                <div className="mt-6 text-center space-y-4">
                    <p className="text-gray-600">
                        Didn't receive the code?{' '}
                        <button className="text-green-600 hover:text-green-800 font-semibold" disabled={isPending}>
                            Resend Code
                        </button>
                    </p>

                    <button
                        onClick={navigateToRegister}
                        disabled={isPending}
                        className="flex items-center justify-center text-gray-600 hover:text-gray-800 mx-auto"
                    >
                        <span className="material-symbols-outlined w-4 h-4 mr-2">
                            arrow_back
                        </span>
                        Back to Registration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTPPage;
