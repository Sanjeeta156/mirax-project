import React, { useEffect, useState } from "react";

function AdminDashboard() {

  const [managers, setManagers] = useState([]);

  useEffect(() => {

    fetch("https://mirax-project-production.up.railway.app/pending_managers")

      .then((response) => response.json())

      .then((data) => {

        setManagers(data);

      });

  }, []);

  const approveManager = (id) => {

    fetch(

      `https://mirax-project-production.up.railway.app/approve_manager/${id}`,

      {

        method: "PUT"

      }

    )

    .then((response) => response.json())

    .then((data) => {

      alert(data.message);

      window.location.reload();

    });

  };

  return (

    <div style={{

      padding: "40px"

    }}>

      <h1>Pending Manager Requests</h1>

      {

        managers.map((manager) => (

          <div

            key={manager.id}

            style={{

              border: "1px solid black",

              padding: "20px",

              marginBottom: "20px"

            }}

          >

            <h3>{manager.username}</h3>

            <button

              onClick={() => approveManager(manager.id)}

            >

              Approve

            </button>

          </div>

        ))

      }

    </div>
  );
}

export default AdminDashboard;