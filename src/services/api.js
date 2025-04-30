import { API_BASE_URL } from "@/config";

/**
 * API Utility Functions
 *  
 * This module provides utility functions to interact with the backend API.
 * It includes functions for setting and removing authentication credentials,
 * fetching data, and handling errors.
 *  
 */

/**
 * Set authentication credentials in local storage.
 */

export function setAuthCredentials(token, userId) {
    localStorage.setItem('videoflix-auth-token', token);
    localStorage.setItem('videoflix-auth-user-id', userId);
}

/**
 * Remove authentication credentials from local storage.
 */
export function removeAuthCredentials() {
    localStorage.removeItem('videoflix-auth-token');
    localStorage.removeItem('videoflix-auth-user-id');
}

/**
 * Get the authentication token from local storage.
 */
export function getAuthToken() {
    return localStorage.getItem('videoflix-auth-token');
}

/**
 * Get the authentication user ID from local storage.
 * This is used to identify the logged-in user.
 */
export function getAuthUserId() {
    return localStorage.getItem('videoflix-auth-user-id');
}

/**
 * Create headers for API requests.
 * This includes the authentication token if available.
 * */
function createHeaders() {
    const headers = {};
    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }
    return headers;
}

/**
 * Get a user-friendly error message based on the error type.
 * This function checks the type of error and returns a specific message.
 */
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


/**
 * Fetch data from the API.
 * This function takes an endpoint and optional parameters,
 * constructs the URL, and makes a GET request.
 * It handles different content types and errors.
 * */
export async function getData(endpoint, params = {}) {
  let url = `${API_BASE_URL}${endpoint}`;
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

/**
 * Post data to the API.
 * This function takes an endpoint and data object,
 * constructs the URL, and makes a POST request.
 * It handles different content types and errors.
 * */
export async function postDataWJSON(endpoint, data) {
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

/**
 * Post data to the API with FormData.
 * This function takes an endpoint and data object,
 * constructs the URL, and makes a POST request.
 * It handles different content types and errors.
 * */
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