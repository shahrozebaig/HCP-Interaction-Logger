// src/services/api.js
const BASE_URL = "http://localhost:8000";

export async function apiGet(path) {
    const res = await fetch(BASE_URL + path);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`GET ${path} failed: ${res.status} ${text}`);
    }
    return res.json();
}

export async function apiPost(path, body) {
    const res = await fetch(BASE_URL + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`POST ${path} failed: ${res.status} ${text}`);
    }
    return res.json();
}

export async function apiPut(path, body) {
    const res = await fetch(BASE_URL + path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`PUT ${path} failed: ${res.status} ${text}`);
    }
    return res.json();
}
