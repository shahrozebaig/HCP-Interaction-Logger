import { apiPost } from "./api";

export async function callAgent(payload) {
    
    const data = await apiPost("/agent/run", payload);
    return data;  
}

