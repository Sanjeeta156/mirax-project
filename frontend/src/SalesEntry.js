
import React, { useEffect, useState } from "react";
import { FaHamburger, FaCashRegister } from "react-icons/fa";

function SalesEntry() {

  const [foods, setFoods] = useState([]);

  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");

  const [eventName, setEventName] = useState("");
  const [newFoodName, setNewFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {

    fetch("https://mirax-project-production.up.railway.app/menu")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
      });

  }, []);

  const addSales = () => {

    fetch("https://mirax-project-production.up.railway.app/add_sales", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        food_name: foodName,
        quantity: quantity,
        event_name: eventName
      })

    })

    .then((response) => response.json())

    .then((data) => {
      alert(data.message);
    });

  };

  const addFood = () => {

    fetch("https://mirax-project-production.up.railway.app/add_food", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        food_name: newFoodName,
        category: category,
        price: price
      })

    })

    .then((response) => response.json())

    .then((data) => {

      alert(data.message);

      window.location.reload();

    });

  };

  return (

    <div style={{
      padding: "40px",
      textAlign: "center",
      background: "linear-gradient(to right, #dfe9f3, #ffffff)",
      minHeight: "100vh",
      fontFamily: "Arial"
    }}>

      <div style={{
        backgroundColor: "white",
        padding: "30px",
        width: "420px",
        margin: "auto",
        borderRadius: "16px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
      }}>

        <h1 style={{ color: "#1e3a8a" }}>
          <FaHamburger /> Add Food Item
        </h1>

        <input
          type="text"
          placeholder="Food Name"
          onChange={(e) => setNewFoodName(e.target.value)}
          style={inputStyle}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        <br /><br />

        <button onClick={addFood} style={buttonStyle}>
          Add Food
        </button>

      </div>

      <br /><br /><br />

      <div style={{
        backgroundColor: "white",
        padding: "30px",
        width: "420px",
        margin: "auto",
        borderRadius: "16px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
      }}>

        <h1 style={{ color: "#166534" }}>
          <FaCashRegister /> Staff Sales Entry
        </h1>

        <select
          onChange={(e) => setFoodName(e.target.value)}
          style={inputStyle}
        >

          <option value="">
            Select Food
          </option>

          {foods.map((food) => (

            <option
              key={food.id}
              value={food.food_name}
            >
              {food.food_name}
            </option>

          ))}

        </select>

        <br /><br />

        <input
          type="number"
          placeholder="Quantity Sold"
          onChange={(e) => setQuantity(e.target.value)}
          style={inputStyle}
        />

        <br /><br />

        <select
          onChange={(e) => setEventName(e.target.value)}
          style={inputStyle}
        >

          <option value="">
            Select Event
          </option>

          <option value="Normal Day">Normal Day</option>
          <option value="Antaragni">Antaragni</option>
          <option value="Udghosh">Udghosh</option>
          <option value="Diwali">Diwali</option>
          <option value="Techkriti">Techkriti</option>
          <option value="Holy">Holy</option>
          <option value="Galaxy">Galaxy</option>
          <option value="Inferno">Inferno</option>

        </select>

        <br /><br />

        <button onClick={addSales} style={buttonStyle}>
          Add Sales
        </button>

      </div>

    </div>
  );
}

const inputStyle = {
  width: "320px",
  height: "38px",
  padding: "8px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  background: "linear-gradient(to right, #2563eb, #7c3aed)",
  color: "white",
  padding: "12px 24px",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default SalesEntry;
