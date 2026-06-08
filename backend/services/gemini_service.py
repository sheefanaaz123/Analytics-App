import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("VITE_GEMINI_API_KEY")

print("Gemini key found:", bool(api_key))

client = genai.Client(
    api_key=api_key
)


def ask_gemini(prompt):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text