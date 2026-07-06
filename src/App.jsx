import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import About from "./pages/About";
import Login from "./pages/Login";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";


function AppContent() {
  const location = useLocation();

  
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}  

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

     
<Route path="/add-user" element={<AddUser />} />
<Route path="/edit-user" element={<AddUser />} />


        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;