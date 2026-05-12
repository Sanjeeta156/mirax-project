import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ManagerLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

    if (username === "admin" && password === "1234") {

      navigate("/dashboard");

    } else {

      alert("Invalid Login");
    }
  };

  return (

    <div style={{
      textAlign: "center",
      marginTop: "100px",
      fontFamily: "Arial"
    }}>

      <h1>Manager Login</h1>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      <br />

      <button
        onClick={login}
        style={buttonStyle}
      >
        Login
      </button>

    </div>
  );
}

const inputStyle = {
  width: "250px",
  padding: "10px",
  margin: "10px"
};

const buttonStyle = {
  padding: "10px 30px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

export default ManagerLogin;