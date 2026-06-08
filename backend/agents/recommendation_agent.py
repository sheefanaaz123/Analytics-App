from services.gemini_service import ask_gemini

def generate_recommendations(state):

    prompt = f"""
Trends:

{state['trends']}

Risks:

{state['risks']}

Generate recommendations.
"""

    recommendation = ask_gemini(prompt)

    return {
        "recommendation": recommendation
    }