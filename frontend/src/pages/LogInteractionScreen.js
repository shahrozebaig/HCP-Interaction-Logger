// src/pages/LogInteractionScreen.js
import React from "react";
import LogInteractionForm from "../components/LogInteractionForm";
import ChatAssistant from "../components/ChatAssistant";

function LogInteractionScreen() {
    return React.createElement(
        "div",
        { className: "min-h-screen bg-[#EEF1F5] flex flex-col" },

        // Sticky Header
        React.createElement(
            "div",
            {
                className:
                    "w-full bg-white shadow-md px-8 py-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-200 animate-card"
            },
            React.createElement(
                "h1",
                { className: "text-2xl font-bold text-gray-800" },
                "AI-First HCP Interaction Logger"
            ),
            React.createElement(
                "div",
                { className: "text-sm text-gray-500" },
                "Powered by LangGraph + LLM"
            )
        ),

        // Main Layout
        React.createElement(
            "div",
            {
                className:
                    "flex-1 px-8 py-6 grid grid-cols-3 gap-6 max-w-7xl mx-auto w-full"
            },

            // Left: Form
            React.createElement(
                "div",
                { className: "col-span-2" },
                React.createElement(LogInteractionForm)
            ),

            // Right: Chat Assistant
            React.createElement(
                "div",
                { className: "col-span-1" },
                React.createElement(ChatAssistant)
            )
        )
    );
}

export default LogInteractionScreen;
