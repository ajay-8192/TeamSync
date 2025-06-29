export const getStatusColor = (status: string) => {
    switch (status) {
        case 'online': return 'bg-green-400';
        case 'away': return 'bg-yellow-400';
        case 'busy': return 'bg-red-400';
        default: return 'bg-gray-300';
    }
};
