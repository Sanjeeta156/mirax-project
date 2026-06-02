import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {

    if (role === "customer") {

      navigate("/customer");
      return;
    }

    fetch("https://mirax-project-production.up.railway.app/login", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username: username,
        password: password,
        role: role
      })

    })

    .then((response) => response.json())

    .then((data) => {

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

       if (data.role === "admin") {

          navigate("/admin");

        }

       else if (data.role === "manager") {

          navigate("/dashboard");

       }

      else if (data.role === "staff") {

          navigate("/sales");

      }
      }

      else {

        alert("Invalid Login");
      }

    });

  };

  return (

    <div style={{
      padding: "50px",
      textAlign: "center",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh"
    }}>

      <h1
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          color: "#222"
        }}
      >
        Smart Canteen System
      </h1>

      <h2>Select Role</h2>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          width: "320px",
          height: "40px",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      >

        <option value="">
          Select Role
        </option>

        <option value="customer">
          Customer
        </option>

        <option value="staff">
          Canteen Staff
        </option>

        <option value="manager">
          Manager
        </option>

        <option value="superadmin">
          Admin
        </option>


      </select>

      <br /><br />

      {role === "customer" && (

        <button
          onClick={loginUser}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "30px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Enter Customer Section
        </button>

      )}

      {(
    role === "staff" ||
    role === "manager" ||
    role === "superadmin"
    ) && (

        <div>

          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "310px",
              height: "18px",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />

          <br /><br />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "310px",
              height: "18px",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />

          <br /><br />

          <button
            onClick={loginUser}
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 25px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Login
          </button>

        </div>

      )}

      <br /><br /><br />

      <h3>
        New User?
      </h3>

      <button
        onClick={() => navigate("/register")}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 25px",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Register Here
      </button>

    </div>
  );
}

export default Login;