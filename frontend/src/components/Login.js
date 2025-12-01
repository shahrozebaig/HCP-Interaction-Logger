import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

function Login({ onSignupNavigate }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    function handleLogin() {
        if (!email || !pass) {
            alert("Please enter credentials");
            return;
        }
        dispatch(login({ email }));
    }

    return React.createElement(
        "div",
        { className: "flex justify-center items-center h-screen bg-gray-100" },
        React.createElement(
            "div",
            { className: "bg-white shadow-lg rounded-lg p-8 w-96" },

            React.createElement("h2", { className: "text-2xl font-bold mb-5 text-center" }, "Login"),

            React.createElement("input", {
                type: "email",
                placeholder: "Email",
                className: "w-full p-2 mb-4 border rounded",
                value: email,
                onChange: (e) => setEmail(e.target.value),
            }),

            React.createElement("input", {
                type: "password",
                placeholder: "Password",
                className: "w-full p-2 mb-4 border rounded",
                value: pass,
                onChange: (e) => setPass(e.target.value),
            }),

            React.createElement(
                "button",
                { onClick: handleLogin, className: "w-full bg-blue-600 text-white p-2 rounded mb-3" },
                "Login"
            ),

            React.createElement(
                "button",
                { onClick: onSignupNavigate, className: "w-full text-blue-600 underline" },
                "Create an account"
            )
        )
    );
}

export default Login;
