import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"; 

function Signup() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");

    function handleSignup() {
        if (!email || !pass || !confirm) {
            alert("All fields required");
            return;
        }
        if (pass !== confirm) {
            alert("Passwords do not match");
            return;
        }

        // No backend auth yet → just log user in
        dispatch(login({ email }));

        alert("Account created!");
    }

    return React.createElement(
        "div",
        { className: "flex justify-center items-center h-screen bg-gray-200" },
        React.createElement(
            "div",
            { className: "bg-white p-8 rounded shadow-lg w-80" },

            React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Sign Up"),

            React.createElement("input", {
                className: "w-full p-2 mb-3 border rounded",
                placeholder: "Email",
                value: email,
                onChange: (e) => setEmail(e.target.value)
            }),

            React.createElement("input", {
                className: "w-full p-2 mb-3 border rounded",
                type: "password",
                placeholder: "Password",
                value: pass,
                onChange: (e) => setPass(e.target.value)
            }),

            React.createElement("input", {
                className: "w-full p-2 mb-3 border rounded",
                type: "password",
                placeholder: "Confirm Password",
                value: confirm,
                onChange: (e) => setConfirm(e.target.value)
            }),

            React.createElement(
                "button",
                { className: "w-full bg-green-600 text-white p-2 rounded mb-3", onClick: handleSignup },
                "Create Account"
            )
        )
    );
}

export default Signup;
