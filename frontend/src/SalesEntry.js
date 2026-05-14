import React, { useEffect, useState } from "react";

function SalesEntry() {

  const [foods, setFoods] = useState([]);

  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  
  const [eventName, setEventName] = useState("");

  useEffect(() => {

    fetch("http://127.0.0.1:5000/menu")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
      });

  }, []);

  const addSales = () => {

    fetch("http://127.0.0.1:5000/add_sales", {

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

  return (

    <div style={{
      padding: "40px",
      textAlign: "center"
    }}>

      <h1>Canteen Staff Sales Entry</h1>

      <select
        onChange={(e) => setFoodName(e.target.value)}
        style={{
    width: "320px",
    height: "35px",
    padding: "8px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }}
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
        style={{
            width: "300px",
            height: "15px",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "8px",
             border: "1px solid #ccc"
         }}
      />

      <br /><br />

      

      <select
  onChange={(e) => setEventName(e.target.value)}
   style={{
    width: "320px",
    height: "35px",
    padding: "8px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }}
>

  <option value="">
    Select Event
  </option>

  <option value="Normal Day">
    Normal Day
  </option>

  <option value="Antaragni">
    Antaragni
  </option>

  <option value="Udghosh">
    Udghosh
  </option>

  <option value="Diwali">
    Diwali
  </option>

  <option value="Techkriti">
    Techkriti
  </option>

  <option value="Holy ">
    Holy 
  </option>
  <option value="Galaxy">
    Galaxy
  </option>

  <option value="Inferno">
    Inferno
  </option>

</select>
      <br /><br />

      <button onClick={addSales}
      style={{
    backgroundColor: "blue",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  }}>
        Add Sales
      </button>

    </div>
  );
}

export default SalesEntry;