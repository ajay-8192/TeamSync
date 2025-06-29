import { BASE_URL, safeFetch } from "../utils/api";

interface RegisterData {
    email: string;
    lastName: string;
    firstName: string;
    username: string;
}

interface LoginData {
    email: string;
}

interface VerifyData {
    email: string;
    otp: string;
}

interface VerifyAccount {
    email: string;
    verifyId: string;
}

interface UserDetails {
    id: string;
    email: string;
    name: string;
    [key: string]: any;
    // Add other user fields as needed
}

export const authService = {
    register: async (formData: RegisterData) => safeFetch(BASE_URL + "/register", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }),

    verifyAccount: async (formData: VerifyAccount) => safeFetch(BASE_URL + "/verify-account", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }),

    login: async (formData: LoginData) => safeFetch(BASE_URL + "/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }),

    verifyOTP: async (formData: VerifyData) => safeFetch(BASE_URL + "/verify-otp", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }),

    getUserDetails: async (): Promise<UserDetails> => safeFetch(BASE_URL + "/v1/user/me", {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}