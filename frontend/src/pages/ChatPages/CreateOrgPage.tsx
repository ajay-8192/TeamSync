import { useState, useTransition } from "react";
import { colors } from "../../constants";
import { useNavigate } from "react-router";
import { orgServices } from "../../services/orgServices";
import { useOrg } from "../../context/OrgContext";
import { useToast } from "../../context/ToastContext";

const CreateOrgPage: React.FC = () => {

    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const { orgs, fetchOrgs } = useOrg();
    const { addToast } = useToast();

    const [newOrg, setNewOrg] = useState({ name: '', description: '', color: 'bg-blue-500' });

    const cancelCreateorg = () => {
        navigate("/org");
    }

    const createOrganization = () => {
        startTransition(async () => {
            try {
                const response = await orgServices.create(newOrg)
                fetchOrgs([...orgs, response.org]);
                navigate("/org")
            } catch (error: any) {
                addToast(error.message || "Failed to create organisation");
            }
        })
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Organization</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                        <input
                            type="text"
                            value={newOrg.name}
                            onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter organization name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={newOrg.description}
                            onChange={(e) => setNewOrg({ ...newOrg, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Brief description"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
                        <div className="flex space-x-2">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    disabled={isPending}
                                    onClick={() => setNewOrg({ ...newOrg, color })}
                                    className={`w-8 h-8 rounded-full ${color} ${newOrg.color === color ? 'ring-4 ring-gray-300' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex space-x-3 mt-6">
                    <button
                        disabled={isPending}
                        onClick={cancelCreateorg}
                        className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isPending}
                        onClick={createOrganization}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateOrgPage;
