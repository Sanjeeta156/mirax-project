import React, { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import {
  FaUtensils,
  FaStar,
  FaCommentDots,
  FaPizzaSlice,
  FaHamburger,
  FaCoffee
} from "react-icons/fa";

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
      background: "linear-gradient(to right, #dbeafe, #f8fafc)",
      minHeight: "100vh",
      fontFamily: "Arial"
    }}>

      <h1 style={{
        textAlign: "center",
        color: "#1e3a8a",
        marginBottom: "40px"
      }}>
        🍽 Customer Section
      </h1>

      {/* FOOD MENU */}

      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
      }}>

        <h2 style={{
          textAlign: "center",
          color: "#166534"
        }}>
          <FaUtensils /> Food Menu
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px"
        }}>

          {foods.map((food) => (

            <div
              key={food.id}
              style={{
                backgroundColor: "#f8fafc",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                textAlign: "center"
              }}
            >

              <div style={{
                fontSize: "40px",
                marginBottom: "10px",
                color: "#2563eb"
              }}>

                {food.category === "Beverage" ? (
                <FaCoffee />
                ) : food.category === "Main Course" ? (
                 <FaUtensils />                 
                ) : food.category === "Snacks" ? (
                <FaHamburger />
               ) : food.category === "Dessert" ? (
  "🍰"
               ) : food.category === "Chinese" ? (
               "🍜"
              ) : food.category === "South Indian" ? (
  "🥘"
              ) : food.category === "Juice" ? (
              "🧃"
              ) : (
                <FaPizzaSlice />
              )}

              </div>

              <h3>{food.food_name}</h3>

              <p>
                <b>Category:</b> {food.category}
              </p>

              <p style={{
                color: "green",
                fontWeight: "bold",
                fontSize: "18px"
              }}>
                ₹ {food.price}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* FEEDBACK SECTION */}

      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
        marginTop: "50px",
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto"
      }}>

        <h2 style={{
          textAlign: "center",
          color: "#7c3aed"
        }}>
          <FaCommentDots /> Submit Feedback
        </h2>

        <br />

        <input
          type="text"
          placeholder="Customer Name"
          onChange={(e) => setFeedbackName(e.target.value)}
          style={inputStyle}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Food Name"
          onChange={(e) => setFeedbackFood(e.target.value)}
          style={inputStyle}
        />

        <br /><br />

        <select
          onChange={(e) => setRating(e.target.value)}
          style={inputStyle}
        >

          <option value="">
            Select Rating
          </option>

          <option value="1">⭐ 1</option>
          <option value="2">⭐⭐ 2</option>
          <option value="3">⭐⭐⭐ 3</option>
          <option value="4">⭐⭐⭐⭐ 4</option>
          <option value="5">⭐⭐⭐⭐⭐ 5</option>

        </select>

        <br /><br />

        <textarea
          placeholder="Write your comment..."
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            height: "120px",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #ccc"
          }}
        />

        <br /><br />

        <div style={{ textAlign: "center" }}>

          <button
            onClick={submitFeedback}
            style={buttonStyle}
          >
            <FaStar /> Submit Feedback
          </button>

        </div>

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  height: "45px",
  padding: "10px",
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

export default Customer;