import { Outlet } from "react-router";
import { useOrg } from "../context/OrgContext";
import { useEffect, useTransition } from "react";
import { orgServices } from "../services/orgServices";
import { useToast } from "../context/ToastContext";

const OrgRoot: React.FC = () => {

    const [isPending, startTransition] = useTransition();
    const { addToast } = useToast();
    const { fetchOrgs } = useOrg();

    useEffect(() => {
        startTransition(async () => {
            try {
                console.log('====> This is Org Root:', { isPending });
                
                const response = await orgServices.getAllOrgs();
    
                console.log("Response:", { response });
                fetchOrgs(response.orgs);
            } catch (error) {
                addToast("Failed to fetch users", "error");
            }
        })
    }, [])

    if (isPending) return <div>Fetching user orgs...</div>

    return <Outlet />;
};

export default OrgRoot;
