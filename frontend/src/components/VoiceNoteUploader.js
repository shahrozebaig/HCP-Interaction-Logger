import { useState } from "react";
import { apiPost } from "../services/api";

function VoiceNoteUploader() {
    const [text, setText] = useState("");
    const [response, setResponse] = useState(null);

    async function summarize() {
        const res = await apiPost("/agent/run", {
            intent: "summarize_voice",
            data: { transcript: text }
        });
        setResponse(res);
    }

    return (
        <div>
            <h2>Voice Transcript → Summary</h2>
            <textarea placeholder="Paste your transcript..." value={text} onChange={(e)=>setText(e.target.value)} />
            <button onClick={summarize}>Summarize</button>

            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
}

export default VoiceNoteUploader;
