from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import re
from huggingface_hub import InferenceClient

# Load environment variables
load_dotenv()
API_KEY = os.getenv("NEBIUS_API_KEY")  # Ensure the key exists

if not API_KEY:
    raise ValueError("API Key is missing. Please check your .env file.")

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Function to generate business proposals
def generate_proposal(user_message):
    """ Calls the AI model to generate a business proposal """
    client = InferenceClient(provider="nebius", api_key=API_KEY)

    message = f"""
    Create a professional business proposal based on the following details:
    {user_message}
    
    Please structure the proposal with the following sections:
    1. Executive Summary
    2. Project Overview
    3. Scope of Work
    4. Methodology
    5. Timeline and Milestones
    6. Budget and Pricing
    7. Terms and Conditions
    """

    messages = [
        {"role": "system", "content": "You are a professional proposal writer with expertise in creating detailed business proposals."},
        {"role": "user", "content": message}
    ]

    completion = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-R1",
        messages=messages,
        max_tokens=500
    )

    ai_answer = completion.choices[0].message.content

    # Clean AI output (removes <think> tags)
    cleaned_response = re.sub(r'<\s*think\s*>.*?</\s*think\s*>', '', ai_answer, flags=re.DOTALL | re.IGNORECASE).strip()

    return cleaned_response

# MCP API Route
@app.route('/api/proposalAssistant', methods=['POST'])
def proposal_assistant():
    try:
        data = request.json
        user_message = data.get("projectDetails", "")

        if not user_message:
            return jsonify({"success": False, "error": "No project details provided"}), 400

        # Generate proposal
        proposal = generate_proposal(user_message)

        return jsonify({
            "success": True,
            "proposal": proposal
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# MCP Endpoint for External AI Models
@app.route('/api/mcp', methods=['POST'])
def external_mcp():
    """ Allows external AI models/services to send a request to this service """
    try:
        data = request.json
        external_input = data.get("input", "")

        if not external_input:
            return jsonify({"success": False, "error": "No input provided"}), 400

        # Call AI model directly instead of Flask route
        response = generate_proposal(external_input)

        return jsonify({
            "success": True,
            "response": response
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True, port=5001)
