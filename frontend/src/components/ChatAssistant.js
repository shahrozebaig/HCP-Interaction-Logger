import React, { useState } from "react";
import { callAgent } from "../services/agent";
import { useDispatch } from "react-redux";
import { setFormFields, setSavedRecord } from "../redux/interactionSlice";

function ChatAssistant() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);

    function formatDateTime(isoString) {
        if (!isoString || !isoString.includes("T")) return { date: "", time: "" };
        const [yyyy, mm, dd] = isoString.split("T")[0].split("-");
        const formattedDate = `${mm}/${dd}/${yyyy}`;
        const [rawH, rawM] = isoString.split("T")[1].split(":");
        let hour = parseInt(rawH, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        const formattedTime = `${hour}:${rawM} ${ampm}`;
        return { date: formattedDate, time: formattedTime };
    }

    function extractHcpName(obj) {
        if (!obj) return null;
        const text = JSON.stringify(obj).toLowerCase();
        const keys = ["hcpName", "hcp_name", "hcp", "doctor", "name"];
        for (let k of keys) {
            if (obj[k]) return obj[k];
        }

        const match = text.match(/dr\.?\s+[a-z]+/i);
        return match ? match[0].replace("dr", "Dr") : null;
    }

    function normalizeFields(fields, record) {
        let f = { ...fields };
        const n1 = extractHcpName(fields);
        const n2 = extractHcpName(record);
        const n3 = extractHcpName(record?.fields);
        f.hcpName = n1 || n2 || n3 || f.hcpName || "";
        if (fields.date) {
            const dt = formatDateTime(fields.date);
            f.date = dt.date;
            f.time = dt.time;
        }
        return f;
    }

    window.__dispatch__ = (fields) => {
        dispatch(setFormFields(fields));
        setTimeout(() => {
            document.querySelectorAll(".auto-field").forEach((el) => {
                el.classList.add("field-pulse");
                setTimeout(() => el.classList.remove("field-pulse"), 1000);
            });
        }, 30);
    };

    window.handleVoiceUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        document.getElementById("voice-wave").classList.remove("hidden");
        const bar = document.getElementById("upload-bar");
        bar.classList.remove("hidden");
        const formData = new FormData();
        formData.append("audio", file);
        const res = await fetch("http://localhost:8000/api/voice/summarize", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        document.getElementById("voice-wave").classList.add("hidden");
        bar.classList.add("hidden");
        if (data.fields) {
            const fixed = normalizeFields(data.fields, {});
            window.__dispatch__(fixed);
        }
        addMsg("ai", "🎙️ <b>Voice note summarized successfully!</b>", "success");
    };

    function addMsg(role, text, style) {
        setMessages((m) => [...m, { role, text, style }]);
    }

    async function send() {
        if (!input.trim()) return;
        addMsg("user", input, "user");
        setTyping(true);
        let res = null;
        try {
            res = await callAgent({ intent: "log_interaction", text: input });
        } catch (err) {
            addMsg("ai", "⚠️ AI backend unreachable.", "error");
            setTyping(false);
            return;
        }

        setTyping(false);
        if (!res) {
            addMsg("ai", "⚠️ No response from AI.", "error");
            return;
        }

        if (res.status === "ok") {
            addMsg("ai", "<b>Interaction logged successfully!</b>", "success");
        }

        if (res.fields) {
            const cleaned = normalizeFields(res.fields, res.record);
            window.__dispatch__(cleaned);
        }

        if (res.record) dispatch(setSavedRecord(res.record));
        setInput("");
    }

    function typingDots() {
        return React.createElement(
            "div",
            { className: "wave-container mt-2" },
            ...Array(5).fill().map(() => React.createElement("div", { className: "wave-bar" }))
        );
    }

    function renderBubble(msg, idx) {
        const base = "animate-fadeInUp p-3 rounded border";
        const styles = {
            user: "bg-blue-100 border-blue-300",
            success: "bg-green-100 border-green-300",
            error: "bg-red-100 border-red-300",
            default: "bg-gray-100 border-gray-300",
        };

        return React.createElement(
            "div",
            { key: idx, className: "mb-3" },
            React.createElement("div", {
                className: `${base} ${styles[msg.style] || styles.default}`,
                dangerouslySetInnerHTML: { __html: msg.text }
            })
        );
    }

    return React.createElement(
        "div",
        { className: "bg-white shadow-xl rounded-2xl p-5 h-[85vh] flex flex-col animate-card" },
        React.createElement("h2", { className: "text-lg font-bold mb-3" }, "AI Assistant"),
        React.createElement(
            "div",
            { className: "flex-1 overflow-y-auto pr-1" },
            messages.map(renderBubble),
            typing && typingDots()
        ),

        React.createElement(
            "div",
            { className: "flex gap-2 mt-4" },
            React.createElement("input", {
                className:
                    "flex-1 border p-2 rounded shadow focus:ring focus:ring-blue-200 outline-none",
                placeholder: "Describe interaction...",
                value: input,
                onChange: (e) => setInput(e.target.value)
            }),
            React.createElement(
                "button",
                {
                    className:
                        "bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition",
                    onClick: send
                },
                "Log"
            )
        )
    );
}

export default ChatAssistant;
