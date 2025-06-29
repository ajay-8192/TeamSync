import { useNavigate } from "react-router";
import type { OrgTypes } from "../types/contextTypes";
import { colors } from "../constants";
import { useOrg } from "../context/OrgContext";

const OrganizationCard: React.FC<{ org: OrgTypes }> = ({ org }) => {

    const navigate = useNavigate();
    const { changeSelectedOrg } = useOrg();

    const handleOrgClick = () => {
        changeSelectedOrg(org);
        navigate(`/org/${org.id}`);
    }

    // Get random color from colors constant
    // Import colors if not already imported
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={handleOrgClick}>
            <div className={`h-32 ${randomColor} relative`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <span className="material-symbols-outlined w-8 h-8 mb-2">
                        corporate_fare
                    </span>
                    <h3 className="font-bold text-lg">{org.name}</h3>
                </div>
            </div>
            <div className="p-4">
                <p className="text-gray-600 text-sm mb-3 font-medium">{org.description}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                        <span className="material-symbols-outlined w-6 h-6 mr-1">
                            group
                        </span>
                        {org.membersCount} members
                    </div>
                    <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                        <span className="material-symbols-outlined w-6 h-6 mr-1">
                            chat_bubble
                        </span>
                        Chat
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationCard;
