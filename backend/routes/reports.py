from flask import Blueprint, jsonify
import json
import os

reports_bp = Blueprint("reports", __name__)
DATA_FILE = os.path.join("data", "reports.json")

def read_reports():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

@reports_bp.route("/api/reports", methods=["GET"])
def get_reports():
    return jsonify(read_reports())