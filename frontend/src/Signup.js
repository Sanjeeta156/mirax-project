import React, { useState } from "react";

function Signup() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const signup = () => {

    fetch("https://mirax-project-production.up.railway.app/signup", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username,
        password,
        role
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
      marginTop: "100px"
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

      <select onChange={(e) => setRole(e.target.value)}>

        <option>Select Role</option>
        <option value="manager">Manager</option>
        <option value="staff">Staff</option>

      </select>

      <br /><br />

      <button onClick={signup}>
        Signup
      </button>

    </div>
  );
}

export default Signup;