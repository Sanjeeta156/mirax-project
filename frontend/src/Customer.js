import React, { useEffect, useState } from "react";

function Customer() {

  const [foods, setFoods] = useState([]);

  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackFood, setFeedbackFood] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {

    fetch("https://mirax-project-production.up.railway.app/menu")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
      });

  }, []);

  const submitFeedback = () => {

    fetch("https://mirax-project-production.up.railway.app/add_feedback", {

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
            
          </tr>

        </thead>

        <tbody>

          {foods.map((food) => (

            <tr key={food.id}>
              <td style={tableStyle}>{food.food_name}</td>
              <td style={tableStyle}>{food.category}</td>
              <td style={tableStyle}>₹ {food.price}</td>
              
            </tr>

          ))}

        </tbody>

      </table>

      <h2 style={{
        marginTop: "50px",
        textAlign: "center"
      }}>
        Submit Feedback
      </h2>

      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "97%",
        margin: "auto",
        marginTop: "20px",
        textAlign: "center"
      }}>

        <input
          type="text"
          placeholder="Customer Name"
          onChange={(e) => setFeedbackName(e.target.value)}
          style={{
          width: "100%",
          height: "15px",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc"
          
           }}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Food Name"
          onChange={(e) => setFeedbackFood(e.target.value)}
          style={{
          width: "100%",
          height: "15px",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc"
           }} 
        />

        <br /><br />

        <input
          type="number"
          placeholder="Rating"
          onChange={(e) => setRating(e.target.value)}
          style={{
          width: "100%",
          height: "15px",
          padding: "8px",
          fontSize: "16px",
         borderRadius: "8px",
          border: "1px solid #ccc"
           }}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Comment"
          onChange={(e) => setComment(e.target.value)}
          style={{
          width: "100%",
          height: "15px",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc"
           }}
        />

        <br /><br />

        <button onClick={submitFeedback}
        style={{
        backgroundColor: "blue",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer"
        }}>
          Submit Feedback
        </button>

      </div>

    </div>
  );
}

const tableStyle = {
  border: "6px solid #ddd",
  padding: "12px",
  textAlign: "center"
  
  
};

export default Customer;