import { createContext, useContext, useState } from "react";
import type { OrgContextTypes, OrgTypes } from "../types/contextTypes";

const OrgContext = createContext<OrgContextTypes | undefined>(undefined);

export const OrgProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [selectedOrg, setSelectedOrg] = useState<OrgTypes | null>(null);

    const [orgs, setOrgs] = useState<OrgTypes[]>([]);

    const changeSelectedOrg = (value: OrgTypes) => {
        setSelectedOrg(value);
    }

    const fetchOrgs = (value: OrgTypes[]) => {
        setOrgs(value);
        if (value.length) {
            changeSelectedOrg(value[0])
        }
    }

    return (
        <OrgContext.Provider value={{ selectedOrg, orgs, fetchOrgs, changeSelectedOrg }}>
            {children}
        </OrgContext.Provider>
    )
};

export const useOrg = () => {
    const context = useContext(OrgContext);

    if (context === undefined) {
        throw new Error('useChat must be used within an ChatProvider');
    }
    return context
}
