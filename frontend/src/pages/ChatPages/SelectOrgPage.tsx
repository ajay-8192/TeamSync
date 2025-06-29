import { useNavigate } from "react-router";
import { useOrg } from "../../context/OrgContext";
import OrganizationCard from "../../components/OrganizationCard";

const SelectOrgPage: React.FC = () => {

    const navigate = useNavigate();
    const { orgs } = useOrg();

    const navigateToCreate = () => {
        navigate("/org/create");
    }

    const navigateToGlobalOrg = () => {
        navigate("/org/global");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Organizations</h1>
                    <p className="text-gray-600">Join or create organizations to collaborate</p>
                </div>

                <div className="mb-8 flex justify-center">
                    <button
                        onClick={navigateToGlobalOrg}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl mr-4"
                    >
                        <span className="material-symbols-outlined w-6 h-6">
                            public
                        </span>
                        <span>Global Chat</span>
                    </button>
                    <button
                        onClick={navigateToCreate}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                        <span className="material-symbols-outlined w-6 h-6">
                            add
                        </span>
                        <span>Create Organization</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orgs.map((org) => (
                        <OrganizationCard key={org.id} org={org} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectOrgPage;
