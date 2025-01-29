import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/LoginPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 📌 Importálni kell a stílust

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegistration = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/Auth/Register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, userName, password }),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }
            const data = await response.json();
            if (data) {
                toast.success("Registration was successful! 🎉"); // 🔥 Toast használata
                setTimeout(() => navigate("/"), 1000); // 2 mp után navigál
            }

        } catch (error) {
            console.error("registration error:", error.message);
            toast.error("Can't register you right now ❌"); // 🔥 Hibaüzenet toasthoz
        }
    };

    return (
        <div className="formContainer">
            <form className="form" onSubmit={handleRegistration}>
                <div className="emailContainer">
                    <label>Your Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Your Email..." />
                </div>

                <div className="UserNameContainer">
                    <label>Your Username:</label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder="Your username..." />
                </div>

                <div className="passwordContainer">
                    <label>Your Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Your password..." />
                </div>

                <div className="buttonholder">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}
