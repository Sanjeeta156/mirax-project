import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {

  const [analytics, setAnalytics] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [topFoods, setTopFoods] = useState([]);
  const [eventSales, setEventSales] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {

    fetch("https://mirax-project-production.up.railway.app/analytics")
      .then((response) => response.json())
      .then((data) => {
        setAnalytics(data);
      });

    fetch("https://mirax-project-production.up.railway.app/feedbacks")
      .then((response) => response.json())
      .then((data) => {
        setFeedbacks(data);
      });
      fetch("https://mirax-project-production.up.railway.app/low_stock")
  .then((response) => response.json())
  .then((data) => {
    setLowStock(data);
  });
  fetch("https://mirax-project-production.up.railway.app/top_foods")
  .then((response) => response.json())
  .then((data) => {
    setTopFoods(data);
  });
  
  fetch("https://mirax-project-production.up.railway.app/event_sales")
  .then((response) => response.json())
  .then((data) => {
    setEventSales(data);
  });
fetch("https://mirax-project-production.up.railway.app/monthly_revenue")
  .then((response) => response.json())
  .then((data) => {
    setMonthlySales(data);
  });

  }, []);
  const chartData = {
  labels: topFoods.map((food) => food.food_name),

  datasets: [
    {
      label: "Total Items Sold",
      data: topFoods.map((food) => food.total_items),
      backgroundColor: "rgba(54, 162, 235, 0.7)"
    }
  ]
};
const eventChartData = {
  labels: eventSales.map((event) => event.event_name),

  datasets: [
    {
      label: "Event Sales",
      data: eventSales.map((event) => event.total_sales),
      backgroundColor: "rgba(255, 99, 132, 0.7)"
    }
  ]
};

const monthlyChartData = {
  labels: monthlySales.map((sale) => sale.month),

  datasets: [
    {
      label: "Monthly Revenue",
      data: monthlySales.map((sale) => sale.total_sales),
      backgroundColor: "rgba(75, 192, 192, 0.7)"
    }
  ]
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
      Manager Dashboard
    </h1>

    <div style={{
      marginTop: "50px",
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      flexWrap: "wrap"
    }}>

      <div style={cardStyle}>
        <h2>Total Orders</h2>
        <h1>{analytics.total_orders}</h1>
      </div>

      <div style={cardStyle}>
        <h2>Total Revenue</h2>
        <h1>₹ {analytics.total_revenue}</h1>
      </div>

      <div style={cardStyle}>
        <h2>Top Selling Food</h2>
        <h1>{analytics.top_selling_food}</h1>
      </div>

    </div>

    <h2 style={{

      marginTop: "50px",
      textAlign: "center"
    }}>
      Food Demand Analytics
    </h2>

    <div style={{
      width: "90%",
       height: "400px",
      margin: "auto",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px"
    }}>

      <Bar data={chartData} 
      options={{
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: "Total No. of Items Sold"
        },

        ticks: {
          stepSize: 10
        }
        
      },
      x: {
        title: {
          display: true,
          text: "Food Items"
        }
      }
    }
  }}/>
      

    </div>
    <h2 style={{
  marginTop: "50px",
  textAlign: "center"
}}>
  Event Sales Analytics
</h2>

<div style={{
  width: "90%",
   height: "400px",
  margin: "auto",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px"
}}>

 <Bar
  data={eventChartData}
  options={{
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true
      }
    },

    scales: {
      y: {
        title: {
          display: true,
          text: "Event Revenue (₹)"
        }
      },

      x: {
        title: {
          display: true,
          text: "Events"
        }
      }
    }
  }}
/>
</div>
<h2 style={{
  marginTop: "50px",
  textAlign: "center"
}}>
  Monthly Revenue Analytics
</h2>

<div style={{
  width: "90%",
    height: "400px",
    margin: "auto",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px"
}}>

  <Bar
  data={monthlyChartData}
  options={{
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true
      }
    },

    scales: {
      y: {
        title: {
          display: true,
          text: "Revenue (₹)"
        }
      },

      x: {
        title: {
          display: true,
          text: "Months"
        }
      }
    }
  }}
/>
</div>
    

    <h2 style={{
      marginTop: "50px",
      textAlign: "center"
    }}>
      Customer Feedbacks
    </h2>

    <div style={{
      maxHeight: "300px",
      overflowY: "scroll",
      marginTop: "20px"
    }}>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "white"
      }}>

        <thead>

          <tr>
            <th style={tableStyle}>Customer</th>
            <th style={tableStyle}>Food</th>
            <th style={tableStyle}>Rating</th>
            <th style={tableStyle}>Comment</th>
          </tr>

        </thead>

        <tbody>

          {feedbacks.map((feedback) => (

            <tr key={feedback.id}>
              <td style={tableStyle}>{feedback.customer_name}</td>
              <td style={tableStyle}>{feedback.food_name}</td>
              <td style={tableStyle}>{feedback.rating}</td>
              <td style={tableStyle}>{feedback.comment}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

    <h2 style={{
      marginTop: "50px",
      textAlign: "center"
    }}>
      Low Stock Alerts
    </h2>

    <table style={{
      width: "100%",
      marginTop: "20px",
      borderCollapse: "collapse",
      backgroundColor: "white"
    }}>

      <thead>

        <tr>
          <th style={tableStyle}>Food Item</th>
          <th style={tableStyle}>Remaining Quantity</th>
        </tr>

      </thead>

      <tbody>

        {lowStock.map((food, index) => (

          <tr key={index}>
            <td style={tableStyle}>{food.food_name}</td>
            <td style={tableStyle}>{food.quantity}</td>
          </tr>

        ))}

      </tbody>

    </table>

  </div>
);
}

const cardStyle = {
  width: "250px",
  padding: "30px",
  backgroundColor: "white",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
};

const tableStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "center"
};

export default Dashboard;