import React, { useState } from "react";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const registerUser = async () => {

    try {

      const response = await fetch(
        "https://mirax-project-production.up.railway.app/signup",
       {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username: username,
          password: password,
          role: role
        })
      }
    );

    const data = await response.json();

    alert(data.message);

  } catch (error) {

    alert("Registration Failed");

    console.log(error);

  }

}; 

 return (

  <div style={{
    textAlign: "center",
    padding: "50px"
  }}>

    <h1>Create Account</h1>

    <select
      onChange={(e) => setRole(e.target.value)}
      style={{
        width: "220px",
        height: "35px"
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

    </select>

    <br /><br />

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