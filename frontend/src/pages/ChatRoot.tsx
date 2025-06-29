import { Outlet } from "react-router";
import { useOrg } from "../context/OrgContext";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { getStatusColor } from "../utils/utils";

const ChatRoot: React.FC = () => {

    const { selectedOrg } = useOrg();
    const { user } = useAuth();
    const { channels, selectedChannel, changeSelectedChannel } = useChat();

    return (
        <div className="h-screen flex overflow-auto">
            {/* Sidebar */}
            <div className="w-64 bg-indigo-900 text-white flex flex-col">
                {/* Workspace header */}
                <div className="p-4 border-b border-indigo-800">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold">{selectedOrg?.name}</h1>
                        <button className="p-1 hover:bg-indigo-800 rounded">
                            {/* <ChevronDown className="w-4 h-4" /> */}
                            <span className="material-symbols-outlined w-4 h-4">
                                keyboard_arrow_down
                            </span>
                        </button>
                    </div>
                    <div className="flex items-center mt-2 text-indigo-200">
                        <span className="w-2 h-2 fill-current bg-green-400 mr-2 rounded-full" />
                        <span className="text-sm">{user?.firstName + " " + user?.lastName || user?.username}</span>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-2/3 transform text-indigo-300 w-4 h-4">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-indigo-800 text-white placeholder-indigo-300 pl-9 pr-4 py-2 rounded-md focus:bg-indigo-700 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Channels */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-indigo-200 uppercase tracking-wide">Channels</h3>
                            <button className="p-1 hover:bg-indigo-800 rounded">
                                <span className="material-symbols-outlined w-6 h-6 text-indigo-300">
                                    add
                                </span>
                            </button>
                        </div>

                        <div className="space-y-1">
                            {channels.filter(channel => channel.type === "GROUP").map(channel => (
                                <button
                                    key={channel.id}
                                    onClick={() => {
                                        changeSelectedChannel(channel);
                                    }}
                                    className={`w-full flex items-center px-2 py-1.5 rounded text-left hover:bg-indigo-800 ${
                                        selectedChannel?.id === channel.id ? 'bg-indigo-700' : ''
                                    }`}
                                >
                                    {channel.isPrivate ? (
                                        <span className="material-symbols-outlined mr-2 text-indigo-300">
                                            lock
                                        </span>
                                    ) : (
                                        <span className="material-symbols-outlined mr-2 text-indigo-300">
                                            tag
                                        </span>
                                    )}
                                    <span className="flex-1 truncate">{channel.name}</span>
                                    {/* {channel.unread > 0 && (
                                        <span className="bg-red-500 text-xs rounded-full px-2 py-0.5 ml-2">
                                        {channel.unread}
                                        </span>
                                    )} */}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Direct Messages */}
                    <div className="px-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-indigo-200 uppercase tracking-wide">Direct Messages</h3>
                            <button className="p-1 hover:bg-indigo-800 rounded">
                                <span className="material-symbols-outlined w-6 h-6 text-indigo-300">
                                    add
                                </span>
                            </button>
                        </div>

                        <div className="space-y-1">
                            {channels.filter(channel => channel.type === "DM").map(channel => (
                                <button
                                    key={channel.id}
                                    onClick={() => {
                                        changeSelectedChannel(channel);
                                    }}
                                    className={`w-full flex items-center px-2 py-1.5 rounded text-left hover:bg-indigo-800 ${
                                        selectedChannel?.id === channel.id ? 'bg-indigo-700' : ''
                                    }`}
                                >
                                    <div className="relative mr-2">
                                        <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs font-medium">
                                            {channel?.users?.[0].firstName || channel.name}
                                        </div>
                                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-indigo-900 ${getStatusColor(channel.users[0].status)}`}></div>
                                    </div>
                                    <span className="flex-1 truncate">{channel.name}</span>
                                    {/* {user.unread > 0 && (
                                        <span className="bg-red-500 text-xs rounded-full px-2 py-0.5 ml-2">
                                            {user.unread}
                                        </span>
                                    )} */}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* User Profile */}
                <div className="p-4 border-t border-indigo-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                                {user?.firstName[0]}{user?.lastName[0]}
                            </div>
                            <div>
                                <div className="text-sm font-medium">{user?.firstName} {user?.lastName}</div>
                                <div className="text-xs text-indigo-300">Available</div>
                            </div>
                        </div>
                        <button className="p-1 hover:bg-indigo-800 rounded">
                            <span className="material-symbols-outlined text-indigo-300">
                                settings
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default ChatRoot;
