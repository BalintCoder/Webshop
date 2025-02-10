import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/LoginPage.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Loginpage () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
   const handleLogin = async (event) => {
       
       event.preventDefault()
       try {
           const response = await fetch("/api/Auth/Login",{
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify({email, password}),
           });
           
           if (!response.ok)
           {
               throw new Error("Login Failed")
           }
           const data = await response.json()
           console.log(data)
           const token = data.password
           console.log(token)
          
           localStorage.setItem("token", token)
           toast.success("Login successful!", { position: "top-center" });

           // Navigáció késleltetéssel
           navigate("/mainPage");
       } catch (error) {
           console.error("Login error:", error.message);
           alert("wrong password or username");
       }
   };
    
    
    return (
        <div className="formContainer">
            <form className="form" onSubmit={handleLogin}>
                <div className="emailContainer">
                    <label>Your Email:</label>
                    <input type="email" id="emailId" name="emailName" value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required placeholder="Your Email..."/>

                    <p className="register-acc">
                        <a href="/register" className="register-link">Register here:</a>
                    </p>
                </div>

                <div className="passwordContainer">

                    <label> Your Password</label>
                    <input type="password" id="passwordId" name="passwordName" value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required placeholder="Your password..."/>

                </div>
                <div className="buttonholder">
                    <button type="submit">Login</button>
                </div>
            </form>

        </div>
        

    )

}