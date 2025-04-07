import { API_BASE_URL } from "@/config";

export function setAuthCredentials(token, userId, username) {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('auth-user', username);
    localStorage.setItem('auth-user-id', userId);
}

export function removeAuthCredentials() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-user-id');
}

export function getAuthToken() {
    return localStorage.getItem('auth-token');
}

export function getAuthUser() {
    return localStorage.getItem('auth-user');
}

export function getAuthUserId() {
    return localStorage.getItem('auth-user-id');
}


function createHeaders() {
    const headers = {};

    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    return headers;
}

function getErrorMessage(error) {
    let errorMessage = 'Network error';

    if (error instanceof TypeError) {
        errorMessage = 'There was an issue with the request or network connection.';
    } else if (error instanceof SyntaxError) {
        errorMessage = 'Response was not valid JSON.';
    } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Failed to connect to the server.';
    }

    return errorMessage;
}

export async function getData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: createHeaders(),
        });
        const responseData = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        return {
            ok:false,
            status: 'error',
            message: errorMessage
        };
    }
}


export async function postDataWJSON(endpoint, data) {
    console.log(data);
    console.log(endpoint);
    
    let header = createHeaders();
    header['Content-Type'] = 'application/json';
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        });
        
        const responseData = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };
        
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        return {
            ok:false,
            status: 'error',
            message: errorMessage
        };
    }
}



export async function deleteData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: createHeaders(),
        });

        return {
            ok: response.ok,
            status: response.status,
            data: {}
        };

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        return {
            ok:false,
            status: 'error',
            message: errorMessage
        };
    }
}