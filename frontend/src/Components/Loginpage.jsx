import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
           const token = data.token
          
           localStorage.setItem("token", token)
           navigate("/mainPage");
       } catch (error) {
           console.error("Login error:", error.message);
           alert("wrong password or username");
       }
   };
    
    
    return (
        <div className= "formContainer">
        
            <form className= "form" onSubmit={handleLogin}>
                <div className= "emailContainer">
                    <label>Your Email:</label>
                    <input type="email" id="emailId" name="emailName" value={email} 
                           onChange={(e) => setEmail(e.target.value)}
                           required/>
                </div>
                
                <div className= "passwordContainer">
                    
                    <label> Your Password</label>
                    <input type= "password" id="passwordId" name="passwordName" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                           required/>
                    
                </div>

                <button type="submit">Login</button>

            </form>

        </div>
        
    )
    
}