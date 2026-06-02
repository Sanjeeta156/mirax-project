import React, { useState } from "react";

function Register() {

  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {

    fetch(
      "https://mirax-project-production.up.railway.app/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username,
          password,
          role
        })
      }
    )
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    });

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
          width: "380px",
          textAlign: "center"
        }}
      >

        <h1
          style={{
            marginBottom: "30px",
            color: "#222"
          }}
        >
          Create Account
        </h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px"
          }}
        >
          <option value="">
            Select Role
          </option>

          <option value="manager">
            Manager
          </option>

          <option value="staff">
            Staff
          </option>

          <option value="customer">
            Customer
          </option>

        </select>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "93%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "93%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={registerUser}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;