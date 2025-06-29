import { BASE_URL, safeFetch } from "../utils/api";

interface OrgData {
    name: string;
    description: string;
}

export const orgServices = {
    create: async (formData: OrgData) => safeFetch(BASE_URL + "/v1/org/create", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }),

    getAllOrgs: async () => safeFetch(BASE_URL + "/v1/org", {
        headers: { 'Content-Type': 'application/json' },
    })
}