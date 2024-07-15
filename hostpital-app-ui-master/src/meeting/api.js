const API_BASE_URL = process.env.REACT_APP_SERVER_URL + '/meeting';

// API call to generate authentication token
export const getToken = async () => {
    const res = await fetch(`${API_BASE_URL}/get-token`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const { token } = await res.json();
    return token;
};

// API call to create meeting
export const createMeeting = async ({ token }) => {
    const res = await fetch(`${API_BASE_URL}/create-meeting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    });

    const { meetingId } = await res.json();
    return meetingId;
};

export const validateMeeting = async ({ roomId, token }) => {
    const url = `${API_BASE_URL}/validate-meeting/${roomId}`;

    const options = {
        method: "GET",
        headers: { Authorization: token, "Content-Type": "application/json" },
    };

    const result = await fetch(url, options)
        .then((response) => response.json()) //result will have meeting id
        .catch((error) => console.error("error", error));

    return result;
};

export const getTimeLeft = async ({ roomId, token }) => {
    const url = `${API_BASE_URL}/time-left/${roomId}`;

    const options = {
        method: "GET",
        headers: { Authorization: token, "Content-Type": "application/json" },
    };

    const result = await fetch(url, options)
        .then((response) => response.json()) //result will have meeting id
        .catch((error) => console.error("error", error));

    return result;
};