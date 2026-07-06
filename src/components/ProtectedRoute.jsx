import { Navigate } from "react-router-dom";
import React from "react";
function ProtectedRoute({children}){
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    return isLoggedIn ? children : <Navigate to = "/login" />
}

export default ProtectedRoute;