import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFormFields } from "../redux/interactionSlice";

function LogInteractionForm() {
    const dispatch = useDispatch();
    const form = useSelector((s) => s.interaction.form);

   
    const safeMaterials = Array.isArray(form.materialsShared)
        ? form.materialsShared
        : typeof form.materialsShared === "string"
        ? form.materialsShared.split(",").map((x) => x.trim())
        : [];

    const safeSamples = Array.isArray(form.samplesDistributed)
        ? form.samplesDistributed
        : typeof form.samplesDistributed === "string"
        ? form.samplesDistributed.split(",").map((x) => x.trim())
        : [];

    function update(key, value) {
        dispatch(setFormFields({ [key]: value }));
    }

    return React.createElement(
        "div",
        {
            className:
                "bg-white p-7 shadow-xl rounded-2xl border border-gray-200 space-y-7 animate-card"
        },

        // Header
        React.createElement(
            "div",
            { className: "flex items-center gap-3 pb-3 border-b" },
            React.createElement(
                "div",
                {
                    className:
                        "w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg"
                },
                "📄"
            ),
            React.createElement(
                "h2",
                { className: "text-xl font-bold text-gray-800" },
                "Interaction Details"
            )
        ),

        // Voice Upload Button
        React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                {
                    className:
                        "w-full border border-gray-300 bg-gray-100 text-gray-700 text-left p-3 rounded-lg text-sm hover:bg-gray-200 transition shadow-sm flex items-center justify-between",
                    onClick: () => document.getElementById("voice-upload").click()
                },
                "🎙️ Summarize from Voice Note (Requires Consent)",

                React.createElement(
                    "div",
                    { id: "voice-wave", className: "wave-container hidden" },
                    ...Array(5).fill(null).map(() => React.createElement("div", { className: "wave-bar" }))
                ),

                React.createElement("input", {
                    type: "file",
                    id: "voice-upload",
                    accept: "audio/*",
                    className: "hidden",
                    onChange: (e) => window.handleVoiceUpload(e)
                })
            ),
            React.createElement("div", { id: "upload-bar", className: "upload-bar hidden mt-2" })
        ),

        // HCP + Type
        React.createElement(
            "div",
            { className: "grid grid-cols-2 gap-6" },

            // HCP Name
            React.createElement(
                "div",
                null,
                React.createElement("label", { className: "font-medium text-sm text-gray-700" }, "HCP Name"),
                React.createElement("input", {
                    readOnly: true,
                    value: form.hcpName || "",
                    className:
                        "auto-field w-full border border-gray-300 rounded-lg p-3 mt-1 bg-gray-100 text-gray-700 cursor-not-allowed shadow-sm"
                })
            ),

            // Type
            React.createElement(
                "div",
                null,
                React.createElement("label", { className: "font-medium text-sm text-gray-700" }, "Interaction Type"),
                React.createElement(
                    "select",
                    {
                        value: form.interactionType,
                        className:
                            "w-full border border-gray-300 rounded-lg p-3 mt-1 bg-white text-gray-800 shadow-sm focus:ring-blue-300 focus:ring",
                        onChange: (e) => update("interactionType", e.target.value)
                    },
                    React.createElement("option", null, "Meeting"),
                    React.createElement("option", null, "Phone Call"),
                    React.createElement("option", null, "Follow Up")
                )
            )
        ),

        // Date + Time
        React.createElement(
            "div",
            { className: "grid grid-cols-2 gap-6" },

            React.createElement(
                "div",
                null,
                React.createElement("label", { className: "font-medium text-sm text-gray-700" }, "Date"),
                React.createElement("input", {
                    readOnly: true,
                    value: form.date || "",
                    className:
                        "auto-field w-full border border-gray-300 rounded-lg p-3 mt-1 bg-gray-100 text-gray-700 cursor-not-allowed shadow-sm"
                })
            ),

            React.createElement(
                "div",
                null,
                React.createElement("label", { className: "font-medium text-sm text-gray-700" }, "Time"),
                React.createElement("input", {
                    readOnly: true,
                    value: form.time || "",
                    className:
                        "auto-field w-full border border-gray-300 rounded-lg p-3 mt-1 bg-gray-100 text-gray-700 cursor-not-allowed shadow-sm"
                })
            )
        ),

        // Attendees
        React.createElement(
            "div",
            null,
            React.createElement("label", { className: "font-medium text-sm text-gray-700" }, "Attendees"),
            React.createElement("input", {
                value: form.attendees || "",
                className:
                    "w-full border border-gray-300 rounded-lg p-3 mt-1 bg-white shadow-sm",
                onChange: (e) => update("attendees", e.target.value)
            })
        ),

        // Topics
        React.createElement(
            "div",
            null,
            React.createElement("label", { className: "font-medium text-sm text-gray-700" }, "Topics Discussed"),
            React.createElement("textarea", {
                value: (form.topics || []).join(", "),
                className:
                    "auto-field w-full border border-gray-300 rounded-lg p-3 mt-1 h-28 bg-white shadow-sm",
                onChange: (e) =>
                    update("topics", e.target.value.split(",").map((t) => t.trim()))
            })
        ),

        // Materials & Samples
        React.createElement(
            "div",
            { className: "space-y-4" },
            React.createElement(
                "div",
                { className: "border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm" },
                React.createElement("p", { className: "font-medium text-sm text-gray-700" }, "Materials Shared"),
                React.createElement("p", { className: "text-xs text-gray-600 mt-1" },
                    safeMaterials.length ? safeMaterials.join(", ") : "No materials added."
                )
            ),
            React.createElement(
                "div",
                { className: "border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm" },
                React.createElement("p", { className: "font-medium text-sm text-gray-700" }, "Samples Distributed"),
                React.createElement("p", { className: "text-xs text-gray-600 mt-1" },
                    safeSamples.length ? safeSamples.join(", ") : "No samples added."
                )
            )
        ),

        // Sentiment
        React.createElement(
            "div",
            null,
            React.createElement("label", { className: "font-medium text-sm text-gray-700" }, "HCP Sentiment"),
            React.createElement(
                "div",
                { className: "flex gap-8 mt-2" },
                ["positive", "neutral", "negative"].map((s) =>
                    React.createElement(
                        "label",
                        { className: "flex items-center gap-2 text-gray-800 text-sm" },
                        React.createElement("input", {
                            type: "radio",
                            checked: form.sentiment === s,
                            onChange: () => update("sentiment", s)
                        }),
                        s[0].toUpperCase() + s.slice(1)
                    )
                )
            )
        ),

        // Summary
        React.createElement(
            "div",
            null,
            React.createElement("label", { className: "font-medium text-sm text-gray-700" }, "Outcomes Summary"),
            React.createElement("textarea", {
                value: form.summary || "",
                className:
                    "auto-field w-full border border-gray-300 rounded-lg p-3 mt-1 h-28 bg-white shadow-sm",
                onChange: (e) => update("summary", e.target.value)
            })
        ),

        // Follow Ups
        React.createElement(
            "div",
            null,
            React.createElement("label", { className: "font-medium text-sm text-gray-700" }, "Follow-up Actions"),
            React.createElement("textarea", {
                value: (form.followups || []).join(", "),
                className:
                    "auto-field w-full border border-gray-300 rounded-lg p-3 mt-1 h-28 bg-white shadow-sm",
                onChange: (e) =>
                    update("followups", e.target.value.split(",").map((x) => x.trim()))
            })
        )
    );
}

export default LogInteractionForm;


