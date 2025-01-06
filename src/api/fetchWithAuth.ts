import EventEmitter from "events";

export const authEvents = new EventEmitter();

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch(url, { ...options, headers });

        if (response.status === 401) {
            authEvents.emit("unauthorized");
            throw new Error("Unauthorized");
        }

        return response;
    } catch (error) {
        throw error;
    }
};
