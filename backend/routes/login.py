from flask import Blueprint, jsonify, request, current_app
import json
import os
import jwt
import datetime

login_bp = Blueprint("login", __name__)

DATA_FILE = os.path.join("data", "users.json")

def read_users():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

@login_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data received"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    users = read_users()

    user = next((u for u in users if u["email"] == email), None)

    if not user or user["password"] != password:
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode(
        {
            "user_id": user["id"],
            "email": user["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        },
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    }), 200