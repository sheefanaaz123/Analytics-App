from flask import Blueprint, jsonify
import json
import os

from utils.auth import verify_token

overview_bp = Blueprint("overview", __name__)
DATA_FILE = os.path.join("data", "overview.json")

def read_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

@overview_bp.route("/kpis")
@verify_token
def get_kpis():
    data = read_data()
    return jsonify(data["kpis"])

@overview_bp.route("/revenue")
@verify_token
def get_revenue():
    data = read_data()
    return jsonify(data["revenue"])

@overview_bp.route("/users-growth")
@verify_token
def get_users_growth():
    data = read_data()
    return jsonify(data["usersGrowth"])