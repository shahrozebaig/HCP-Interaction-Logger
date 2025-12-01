import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

function InteractionHistory() {
    const [items, setItems] = useState([]);

    async function load() {
        const hcpId = prompt("Enter HCP ID:");
        const res = await apiGet(`/interactions/hcp/${hcpId}`);
        setItems(res.data);
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div>
            <h2>Interaction History</h2>
            {items.map((item) => (
                <div key={item.id}>
                    <p><b>Date:</b> {item.date}</p>
                    <p><b>Summary:</b> {item.summary}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default InteractionHistory;
