import { createContext, useContext, useState } from "react";
import type { ChannelTypes, ChatContextTypes } from "../types/contextTypes";

const ChatContext = createContext<ChatContextTypes | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [channels, setChannels] = useState<ChannelTypes[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<ChannelTypes | null>(null);

    const addChannels = (chans: ChannelTypes[]) => {
        setChannels(chans);
    }

    const changeSelectedChannel = (channel: ChannelTypes) => {
        setSelectedChannel(channel);
    }

    return (
        <ChatContext.Provider value={{ channels, selectedChannel, addChannels, changeSelectedChannel }}>
            {children}
        </ChatContext.Provider>
    )
};

export const useChat = () => {
    const context = useContext(ChatContext);

    if (context === undefined) {
        throw new Error('useChat must be used within an ChatProvider');
    }
    return context
}
