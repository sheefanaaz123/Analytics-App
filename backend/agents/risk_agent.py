from services.gemini_service import ask_gemini

def analyze_risks(state):

    prompt = f"""
Based on these trends:

{state['trends']}

Identify business risks.
"""

    risks = ask_gemini(prompt)

    return {
        "risks": risks
    }