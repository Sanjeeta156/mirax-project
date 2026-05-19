from flask import Flask, request, jsonify
from database.db import db
from database.models import User, Food, Order, Feedback, Event
from sqlalchemy import func, extract
from datetime import datetime
import os
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token
)

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "smartcanteen123"

jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+pymysql://"
    f"{os.getenv('MYSQLUSER')}:"
    f"{os.getenv('MYSQLPASSWORD')}@"
    f"{os.getenv('MYSQLHOST')}/"
    f"{os.getenv('MYSQLDATABASE')}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


@app.route('/')
def home():
    return "Smart Canteen Backend Running "


@app.route('/add_food', methods=['POST'])
def add_food():
    data = request.json

    new_food = Food(
        food_name=data['food_name'],
        price=data['price'],
        category=data['category'],
        quantity=data['quantity']
    )

    db.session.add(new_food)
    db.session.commit()

    return jsonify({"message": "Food added successfully"})


@app.route('/menu', methods=['GET'])
def get_menu():
    foods = Food.query.all()

    menu = []

    for food in foods:
        menu.append({
            "id": food.id,
            "food_name": food.food_name,
            "price": food.price,
            "category": food.category,
            "quantity": food.quantity
        })

    return jsonify(menu)


with app.app_context():

    db.create_all()

    manager = User.query.filter_by(
        username="manager"
    ).first()

    if not manager:

        manager_user = User(
            username="manager",
            password="manager123",
            role="manager"
        )

        staff_user = User(
            username="staff",
            password="staff123",
            role="staff"
        )

        db.session.add(manager_user)
        db.session.add(staff_user)

        db.session.commit()

@app.route("/place_order", methods=["POST"])
def place_order():

    data = request.get_json()

    food = Food.query.filter_by(
        food_name=data["food_name"]
    ).first()

    total_price = food.price * int(data["quantity"])

    new_order = Order(
        customer_name=data["customer_name"],
        food_name=data["food_name"],
        quantity=data["quantity"],
        price=total_price
    )

    db.session.add(new_order)

    food.quantity = food.quantity - int(data["quantity"])

    db.session.commit()

    return jsonify({
        "message": "Order placed successfully"
    })
@app.route('/feedbacks', methods=['GET'])
def get_feedbacks():

    feedbacks = Feedback.query.all()

    feedback_list = []

    for feedback in feedbacks:
        feedback_list.append({
            "id": feedback.id,
            "customer_name": feedback.customer_name,
            "food_name": feedback.food_name,
            "rating": feedback.rating,
            "comment": feedback.comment
        })

    return jsonify(feedback_list) 

@app.route('/analytics', methods=['GET'])
def analytics():

    total_orders = Order.query.count()

    total_revenue = db.session.query(
        func.sum(Order.total_price)
    ).scalar()

    top_food = db.session.query(
        Order.food_name,
        func.count(Order.food_name)
    ).group_by(Order.food_name).order_by(
        func.count(Order.food_name).desc()
    ).first()

    return jsonify({
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "top_selling_food": top_food[0] if top_food else "No orders"
    })

@app.route('/low_stock', methods=['GET'])
def low_stock():

    foods = Food.query.filter(Food.quantity < 30).all()

    low_stock_items = []

    for food in foods:
        low_stock_items.append({
            "food_name": food.food_name,
            "quantity": food.quantity
        })

    return jsonify(low_stock_items)

@app.route('/add_event', methods=['POST'])
def add_event():

    data = request.json

    new_event = Event(
        event_name=data['event_name'],
        event_date=data['event_date'],
        special_food=data['special_food'],
        expected_customers=data['expected_customers']
    )

    db.session.add(new_event)
    db.session.commit()

    return jsonify({
        "message": "Event added successfully"
    })
@app.route('/events', methods=['GET'])
def get_events():

    events = Event.query.all()

    event_list = []

    for event in events:
        event_list.append({
            "id": event.id,
            "event_name": event.event_name,
            "event_date": event.event_date,
            "special_food": event.special_food,
            "expected_customers": event.expected_customers
        })

    return jsonify(event_list)
@app.route('/delete_food/<int:id>', methods=['DELETE'])
def delete_food(id):

    food = Food.query.get(id)

    if not food:
        return jsonify({
            "message": "Food not found"
        })

    db.session.delete(food)
    db.session.commit()

    return jsonify({
        "message": "Food deleted successfully"
    })
@app.route('/update_food/<int:id>', methods=['PUT'])
def update_food(id):

    food = Food.query.get(id)

    if not food:
        return jsonify({
            "message": "Food not found"
        })

    data = request.json

    food.food_name = data['food_name']
    food.price = data['price']
    food.category = data['category']
    food.quantity = data['quantity']

    db.session.commit()

    return jsonify({
        "message": "Food updated successfully"
    })


@app.route("/top_foods")
def top_foods():

    results = db.session.query(
        Order.food_name,
        func.sum(
            func.coalesce(Order.quantity, 0)
        ).label("total_items")
    ).group_by(
        Order.food_name
    ).all()

    foods = []

    for item in results:

        foods.append({
            "food_name": item.food_name,
            "total_items": int(item.total_items)
        })

    return jsonify(foods)
    
@app.route('/least_sold_foods', methods=['GET'])
def least_sold_foods():

    foods = db.session.query(
        Order.food_name,
        func.count(Order.food_name).label('total_orders')
    ).group_by(
        Order.food_name
    ).order_by(
        func.count(Order.food_name).asc()
    ).all()

    result = []

    for food in foods:
        result.append({
            "food_name": food[0],
            "total_orders": food[1]
        })

    return jsonify(result)

@app.route('/daily_revenue', methods=['GET'])
def daily_revenue():

    revenue = db.session.query(
        func.sum(Order.total_price)
    ).scalar()

    return jsonify({
        "daily_revenue": revenue
    })

@app.route('/event_sales', methods=['GET'])
def event_sales():

    events = db.session.query(
        Order.event_name,
        func.sum(Order.total_price)
    ).group_by(
        Order.event_name
    ).all()

    result = []

    for event in events:

        result.append({
            "event_name": event[0],
            "total_sales": float(event[1])
        })

    return jsonify(result)

@app.route("/monthly_revenue")
def monthly_revenue():

    months = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    }

    revenue = db.session.query(
        extract('month', Order.date).label('month'),
        func.sum(Order.total_price).label('revenue')
    ).group_by(
        extract('month', Order.date)
    ).all()

    result = []

    for item in revenue:

        if item.month is not None:

            result.append({
    "month": months[int(item.month)],
    "total_sales": item.revenue
})

    return jsonify(result)
@app.route('/festival_sales', methods=['GET'])
def festival_sales():

    sales = db.session.query(
        Order.event_name,
        func.sum(Order.total_price)
    ).group_by(
        Order.event_name
    ).all()

    result = []

    for sale in sales:

        if sale[0] is not None and sale[0].strip() != "":

            result.append({
                "event_name": sale[0],
                "revenue": sale[1]
            })

    return jsonify(result)

@app.route('/monthly_sales', methods=['GET'])
def monthly_sales():

    sales = db.session.query(
        func.month(Order.date),
        func.sum(Order.total_price)
    ).group_by(
        func.month(Order.date)
    ).all()

    result = []

    for month in sales:

        result.append({
            "month": month[0],
            "total_sales": float(month[1])
        })

    return jsonify(result)

@app.route("/add_feedback", methods=["POST"])
def add_feedback():

    data = request.get_json()

    new_feedback = Feedback(
        customer_name=data["customer_name"],
        food_name=data["food_name"],
        rating=data["rating"],
        comment=data["comment"]
    )

    db.session.add(new_feedback)
    db.session.commit()

    return jsonify({
        "message": "Feedback added successfully"
    })

@app.route("/add_sales", methods=["POST"])
def add_sales():

    data = request.get_json()

    food = Food.query.filter_by(
        food_name=data["food_name"]
    ).first()

    total_price = food.price * int(data["quantity"])

    new_order = Order(
    customer_name="Walk-in Customer",
    food_name=data["food_name"],
    quantity=data["quantity"],
    total_price=total_price,
    event_name=data.get("event_name", "Normal Day")
    )

    db.session.add(new_order)

    if food:
        food.quantity = food.quantity - int(data["quantity"])

    db.session.commit()

    return jsonify({
        "message": "Sales Added Successfully"
    })
   
@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    user = User.query.filter_by(
        username=data["username"],
        password=data["password"],
        role=data["role"]
    ).first()

    if user:

        token = create_access_token(
            identity=user.username
        )

        return jsonify({
            "token": token,
            "role": user.role
        })

    else:

        return jsonify({
            "message": "Invalid Login"
        }), 401

if __name__ == '__main__':
    app.run(debug=True)