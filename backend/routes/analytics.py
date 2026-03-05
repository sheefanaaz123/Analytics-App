from flask import Blueprint, jsonify
import json
import os

analytics_bp = Blueprint("analytics", __name__)
DATA_FILE = os.path.join("data", "analytics.json")

def read_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

@analytics_bp.route("/api/analytics/kpis", methods=["GET"])
def get_kpis():
    return jsonify(read_data()["kpis"])

@analytics_bp.route("/api/analytics/revenue", methods=["GET"])
def get_revenue():
    return jsonify(read_data()["revenue"])

@analytics_bp.route("/api/analytics/traffic", methods=["GET"])
def get_traffic():
    return jsonify(read_data()["traffic"])