import { useState } from 'react'
import {StrictMode} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Loginpage from "./Components/Loginpage.jsx";
import MainPage from "./Components/MainPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import ItemDetails from "./Components/ItemDetails.jsx";
import RegisterPage from "./Components/RegisterPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./Components/AdminPage.jsx";
function App() {
  

  return (
    <StrictMode>
        
        <BrowserRouter>
            <Routes>
                
            
            <Route path= "/" element={<Loginpage />}/>
                <Route
                    path="/mainPage"
                    element={
                        <ProtectedRoute>
                            <MainPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/item/:id" element={<ItemDetails />} />
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/admin" element={<AdminPage />}/>

            </Routes>
            <ToastContainer position="top-center" autoClose={3000} />
            
        </BrowserRouter>
        
        
    </StrictMode>
  )
}

export default App
