import { useState } from 'react'
import {StrictMode} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Loginpage from "./Components/Loginpage.jsx";
import MainPage from "./Components/MainPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import ItemDetails from "./Components/ItemDetails.jsx";

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

            </Routes>
            
        </BrowserRouter>
        
        
    </StrictMode>
  )
}

export default App
