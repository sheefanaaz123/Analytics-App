from flask import Blueprint, jsonify
import json
import os
import re
from google import genai
from utils.auth import verify_token
from agents.insight_graph import graph
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("VITE_GEMINI_API_KEY")

if not api_key:
    raise ValueError("VITE_GEMINI_API_KEY not found in environment variables. Check your .env file.")

insights_bp = Blueprint("insights", __name__)

client = genai.Client(api_key=api_key)

DATA_FILE = os.path.join("data", "overview.json")


def read_overview_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)


@insights_bp.route("/smart-summary")
@verify_token
def get_ai_insights():
    try:
        data = read_overview_data()

        result = graph.invoke({
            "data": data
        })

        return jsonify({
            "summary": result["trends"],
            "insights": [
                result["trends"],
                result["risks"]
            ],
            "recommendation": result["recommendation"]
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500