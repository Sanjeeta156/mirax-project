from flask import Flask, request, jsonify
from database.db import db
from database.models import User, Food

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Sanjeeta%40' \
'54@localhost/canteen_db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


@app.route('/')
def home():
    return "Smart Canteen Backend Running 🚀"


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


with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)