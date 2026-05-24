import React, { useState } from "react";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {

    fetch("https://mirax-project-production.up.railway.app/register", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username: username,
        password: password
      })

    })

    .then((response) => response.json())

    .then((data) => {
      alert(data.message);
    });

  };

  return (

    <div style={{
      textAlign: "center",
      padding: "50px"
    }}>

      <h1>Create Account</h1>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={registerUser}>
        Register
      </button>

    </div>
  );
}

export default Register;