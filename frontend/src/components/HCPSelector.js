import React, { useState, useEffect } from "react";
import { apiGet } from "../services/api";

function HCPSelector({ onChange }) {
    const [q, setQ] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!q || q.length < 2) {
            setResults([]);
            return;
        }
        let cancelled = false;
        setLoading(true);
        const t = setTimeout(async () => {
            try {
                const res = await apiGet(`/hcp/search/?name=${encodeURIComponent(q)}`);
                if (!cancelled) {
                    if (res && res.status === "ok" && res.data) {
                        const list = Array.isArray(res.data) ? res.data : [res.data];
                        setResults(list);
                    } else {
                        setResults([]);
                    }
                }
            } catch (e) {
                setResults([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }, 300);
        return () => {
            cancelled = true;
            clearTimeout(t);
        };
    }, [q]);
    function selectItem(item) {
        setQ(item.name);
        setResults([]);
        if (onChange) onChange({ id: item.id || item._id || item.hcpId, name: item.name, speciality: item.speciality, location: item.location });
    }
    return React.createElement(
        "div",
        { className: "mb-4" },
        React.createElement("input", {
            className: "w-full border rounded p-3",
            placeholder: "Search or select HCP...",
            value: q,
            onChange: (e) => setQ(e.target.value)
        }),
        results.length > 0 && React.createElement(
            "div",
            { className: "mt-2 bg-white border rounded shadow max-h-40 overflow-auto" },
            results.map((r, i) =>
                React.createElement("div", {
                    key: i,
                    className: "p-2 hover:bg-gray-100 cursor-pointer",
                    onClick: () => selectItem(r)
                }, `${r.name}${r.speciality ? " — " + r.speciality : ""}`)
            )
        ),
        loading ? React.createElement("div", { className: "text-xs text-gray-500 mt-1" }, "Searching...") : null
    );
}
export default HCPSelector;
