import json
from services.gemini_service import ask_gemini

def analyze_trends(state):

    prompt = f"""
Analyze trends from:

{json.dumps(state['data'])}

Return 3 important trends.
"""

    trends = ask_gemini(prompt)

    return {
        "trends": trends
    }