import React ,{ useState } from "react"
import { useNavigate } from "react-router-dom"

function Login(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if(email === "kavyansh@gmail.com" && password === "1234"){
            localStorage.setItem("isLoggedIn" , "true");
            navigate("/");
        }else{
            alert("Invalid Credentials");
        }
    }

   
return (
  <div className="login-page">
    <div className="login-card">

      <h2 className="login-title">Welcome Back 👋</h2>
      <p className="login-subtitle">Login to continue</p>

      <form onSubmit={handleLogin} className="login-form">

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

      </form>
    </div>
  </div>
);

}   

export default Login;
