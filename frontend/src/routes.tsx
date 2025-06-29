import { createBrowserRouter } from "react-router";
import RegisterPage from "./pages/AuthPages/RegisterPage";
import VerifyAccountPage from "./pages/AuthPages/VerifyAccountPage";
import LoginPage from "./pages/AuthPages/LoginPage";
import VerifyOTPPage from "./pages/AuthPages/VerifyOTPPage";
import AuthRoot from "./pages/AuthRoot";
import OrgRoot from "./pages/OrgRoot";
import SelectOrgPage from "./pages/ChatPages/SelectOrgPage";
import ChatRoot from "./pages/ChatRoot";
import ChatPage from "./pages/ChatPages/ChatPage";
import ProfilePage from "./pages/AuthPages/ProfilePage";
import { OrgProvider } from "./context/OrgContext";
import { ChatProvider } from "./context/ChatContext";
import CreateOrgPage from "./pages/ChatPages/CreateOrgPage";

const routes = createBrowserRouter([
    {
        path: "register",
        Component: RegisterPage
    },
    {
        path: "verify-account",
        Component: VerifyAccountPage
    },
    {
        path: "login",
        Component: LoginPage
    },
    {
        path: "verify-otp",
        Component: VerifyOTPPage
    },
    {
        path: "",
        Component: AuthRoot,
        children: [
            {
                path: "me",
                Component: ProfilePage
            },
            {
                path: "org",
                element: (
                    <OrgProvider>
                        <OrgRoot />
                    </OrgProvider>
                ),
                children: [
                    {
                        path: "",
                        Component: SelectOrgPage
                    },
                    {
                        path: "create",
                        Component: CreateOrgPage
                    },
                    {
                        path: ":orgId",
                        element: (
                            <ChatProvider>
                                <ChatRoot />
                            </ChatProvider>
                        ),
                        children: [
                            {
                                path: ":chatId",
                                Component: ChatPage
                            }
                        ]
                    }
                ]
            },
        ]
    }
]);

export default routes;
