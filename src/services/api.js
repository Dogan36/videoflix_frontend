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


export async function getData(endpoint, params = {}) {
  // Query-String anhängen
  let url = `${API_BASE_URL}${endpoint}`;
  console.log(endpoint);
  console.log(params);
  console.log(url);
  if (Object.keys(params).length) {
    const qs = new URLSearchParams(params).toString();
    url += url.includes("?") ? "&" : "?" + qs;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(),
    });

    // Content-Type prüfen
    const contentType = response.headers.get("content-type") || "";
    let data;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else if (contentType.startsWith("video/") || contentType.includes("octet-stream")) {
      data = await response.blob();
    } else {
      data = await response.text();
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
      headers: response.headers,  // kann man z.B. für Range-Infos nutzen
    };
  } catch (error) {
    return {
      ok: false,
      status: "error",
      message: getErrorMessage(error),
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