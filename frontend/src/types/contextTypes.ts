export type UserTypes = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    CreatedAt: string;
    UpdatedAt: string;
    status: string;
};

export type AuthContextTypes = {
    user: UserTypes | null;
    login: (user: UserTypes) => void;
    logout: () => void
};

export type OrgTypes = {
    id: string;
    name: string;
    description: string;
    createdBy: string;
    createdAt: string;
    membersCount: number;
};

export type OrgContextTypes = {
    selectedOrg: OrgTypes | null;
    orgs: OrgTypes[];
    changeSelectedOrg: (value: OrgTypes) => void;
    fetchOrgs: (orgs: OrgTypes[]) => void
};

export type ChannelTypes = {
    id: string;
    workspaceId: string;
    name: string;
    type: "GROUP" | "DM";
    createdBy: string;
    createdAt: string;
    isPrivate: boolean;
    unread: number;
    users: UserTypes[];
};

export type ChatContextTypes = {
    channels: ChannelTypes[];
    selectedChannel: ChannelTypes | null;
    changeSelectedChannel: (channel: ChannelTypes) => void;
    addChannels: (channels: ChannelTypes[]) => void;
};
