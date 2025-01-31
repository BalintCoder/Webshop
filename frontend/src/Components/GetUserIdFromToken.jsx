import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = () => {
    
    const token = localStorage.getItem("token")
    if (!token) return null;
    
    try {
        const decoded  = jwtDecode(token)
        return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } catch (e) {
        console.error("invalid token, error", e)
        return null;
        
    }
    
    
    
}