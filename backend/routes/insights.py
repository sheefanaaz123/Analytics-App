from flask import Blueprint, jsonify
import json
import os
import re
from google import genai
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
def get_ai_insights():

    data = read_overview_data()

    prompt = f"""
You are an AI analyst for a SaaS analytics dashboard called InsightIQ.

Analyze this dashboard data:

{json.dumps(data)}

Return ONLY valid JSON in this format:

{{
 "summary": "short overview of the most important trend",
 "insights": [
   "insight 1",
   "insight 2",
   "insight 3"
 ],
 "recommendation": "one actionable suggestion"
}}

Rules:
- No markdown
- No explanation outside JSON
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text
        text = re.sub(r"```json|```", "", text).strip()

        return jsonify(json.loads(text))

    except Exception as e:
        return jsonify({"error": str(e)}), 500