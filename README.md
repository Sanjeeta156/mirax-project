# Smart Canteen Management & Analytics System

A beginner-friendly full-stack web application developed for managing and analyzing college/university canteen operations efficiently.

---

# Tech Stack

## Frontend

* React.js
* JavaScript
* HTML
* CSS
* Chart.js

## Backend

* Flask (Python)

## Database

* MySQL using SQLAlchemy ORM

## Authentication

* JWT Authentication with role-based login system

---

# Key Features

## Customer Module

* View food menu
* Place food orders
* Submit ratings and feedback

## Staff Module

* Add new food items
* Update inventory stock
* Manage daily sales records

## Manager Module

* Dashboard analytics
* Monthly revenue analysis
* Event/festival sales tracking
* Top-selling food analysis
* Low stock monitoring
* Customer feedback monitoring

---

# Analytics Features

* Monthly Revenue Analytics
* Event Sales Analytics
* Top Ordered Foods
* Low Stock Detection
* Customer Feedback Analysis

---

# Single System Architecture

This project uses a unified Flask backend architecture.

Flask handles:

* Backend REST APIs
* Database operations
* Authentication
* Communication with React frontend

---

# How to Run the Application

## 1. Clone Repository

```bash id="g9m2tx"
git clone <your-github-repository-link>
```

---

## 2. Backend Setup

Open terminal:

```bash id="q7v1za"
cd backend
```

Install required packages:

```bash id="n4p8wr"
pip install flask
pip install flask_sqlalchemy
pip install flask_cors
pip install flask_jwt_extended
pip install pymysql
```

Run backend server:

```bash id="m6t3yk"
python app.py
```

Backend runs on:

```text id="e8r5wc"
http://127.0.0.1:5000
```

---

## 3. Frontend Setup

Open another terminal:

```bash id="k2x9vu"
cd frontend
```

Install dependencies:

```bash id="f5q1mp"
npm install
```

Run frontend:

```bash id="u7n4za"
npm start
```

Frontend runs on:

```text id="v3m8pk"
http://localhost:3000
```

---

# Database Setup

Open MySQL:

```bash id="x1t5rq"
mysql -u root -p
```

Create database:

```sql id="h6v9wc"
CREATE DATABASE canteen_db;
```

Update database configuration inside:

```text id="a4k2mz"
backend/app.py
```

---

# Default Login Credentials

## Manager

Username:

```text id="c7q5wr"
manager1
```

Password:

```text id="m8v1pt"
123
```

---

## Staff

Username:

```text id="y2n4xa"
staff1
```

Password:

```text id="t5k8zc"
123
```

## About

This project was developed as a college full-stack analytics and management system project focusing on real-world canteen operations, inventory handling, and data-driven decision making.
