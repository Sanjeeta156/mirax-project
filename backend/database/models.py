from database.db import db
from datetime import datetime




class Food(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    food_name = db.Column(db.String(100))
    price = db.Column(db.Float)
    category = db.Column(db.String(100))
    quantity = db.Column(db.Integer)

    def __repr__(self):
        return f'<Food {self.food_name}>'
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100))
    food_name = db.Column(db.String(100))
    quantity = db.Column(db.Integer)
    total_price = db.Column(db.Float)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    event_name = db.Column(db.String(100))
    def __repr__(self):
        return f'<Order {self.customer_name}>'  
     
class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100))
    food_name = db.Column(db.String(100))
    rating = db.Column(db.Integer)
    comment = db.Column(db.String(300))

    def __repr__(self):
        return f'<Feedback {self.customer_name}>'   
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(100))
    event_date = db.Column(db.String(50))
    special_food = db.Column(db.String(100))
    expected_customers = db.Column(db.Integer)

    def __repr__(self):
        return f'<Event {self.event_name}>'      
    
class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(100), unique=True)

    password = db.Column(db.String(100))

    role = db.Column(db.String(50))    