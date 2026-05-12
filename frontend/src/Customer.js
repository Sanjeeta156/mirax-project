import React, { useEffect, useState } from "react";

function Customer() {

  const [foods, setFoods] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [eventName, setEventName] = useState("");

  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackFood, setFeedbackFood] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {

    fetch("http://127.0.0.1:5000/menu")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
      });

  }, []);

  const placeOrder = () => {

    fetch("http://127.0.0.1:5000/place_order", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        customer_name: customerName,
        food_name: foodName,
        quantity: quantity,
        price: price,
        event_name: eventName
      })

    })

    .then((response) => response.json())

    .then((data) => {
      alert(data.message);
    });

  };

  const submitFeedback = () => {

    fetch("http://127.0.0.1:5000/add_feedback", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        customer_name: feedbackName,
        food_name: feedbackFood,
        rating: rating,
        comment: comment
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
      fontFamily: "Arial",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh"
    }}>

      <h1 style={{
        textAlign: "center"
      }}>
        Customer Section
      </h1>

      <h2 style={{
        marginTop: "40px",
        textAlign: "center"
      }}>
        Food Menu
      </h2>

      <table style={{
        width: "100%",
        marginTop: "20px",
        borderCollapse: "collapse",
        backgroundColor: "white"
      }}>

        <thead>

          <tr>
            <th style={tableStyle}>Food</th>
            <th style={tableStyle}>Category</th>
            <th style={tableStyle}>Price</th>
            <th style={tableStyle}>Quantity</th>
          </tr>

        </thead>

        <tbody>

          {foods.map((food) => (

            <tr key={food.id}>

              <td style={tableStyle}>{food.food_name}</td>
              <td style={tableStyle}>{food.category}</td>
              <td style={tableStyle}>₹ {food.price}</td>
              <td style={tableStyle}>{food.quantity}</td>

            </tr>

          ))}

        </tbody>

      </table>

      <h2 style={{
        marginTop: "50px"
      }}>
        Place Order
      </h2>

      <input
        type="text"
        placeholder="Customer Name"
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Food Name"
        onChange={(e) => setFoodName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="Event Name"
        onChange={(e) => setEventName(e.target.value)}
      />

      <button onClick={placeOrder}>
        Place Order
      </button>

      <h2 style={{
        marginTop: "50px"
      }}>
        Give Feedback
      </h2>

      <input
        type="text"
        placeholder="Your Name"
        onChange={(e) => setFeedbackName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Food Name"
        onChange={(e) => setFeedbackFood(e.target.value)}
      />

      <input
        type="number"
        placeholder="Rating"
        onChange={(e) => setRating(e.target.value)}
      />

      <input
        type="text"
        placeholder="Comment"
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={submitFeedback}>
        Submit Feedback
      </button>

    </div>
  );
}

const tableStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "center"
};

export default Customer;