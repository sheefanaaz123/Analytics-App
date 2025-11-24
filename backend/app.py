from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json, os, datetime

app = Flask(__name__)

CORS(app,
     resources={r"/*": {"origins": "*"}},
     supports_credentials=True,
     methods=["GET", "POST", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type"]
)

DB_FILE = "charts.json"


def load_charts():
    if not os.path.exists(DB_FILE):
        return []
    with open(DB_FILE, "r") as f:
        content = f.read().strip()
        return json.loads(content) if content else []


def save_charts(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=2)


@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

@app.route("/save-chart", methods=["POST"])
def save_chart():
    body = request.json

    chartName = body.get("chartName")
    labels = body.get("labels", [])
    values = body.get("values", [])
    chartType = body.get("chartType")

    if not chartName:
        return jsonify({"error": "chartName is required"}), 400

    charts = load_charts()

    new_chart = {
        "id": len(charts) + 1,
        "chartName": chartName,
        "chartType": chartType,
        "labels": labels,
        "values": values,
        "createdAt": datetime.datetime.now().isoformat()
    }

    charts.append(new_chart)
    save_charts(charts)

    return jsonify({"message": "Chart saved!", "chart": new_chart}), 200


@app.route("/charts", methods=["GET"])
def get_charts():
    return jsonify(load_charts())


@app.route("/delete-chart/<int:chart_id>", methods=["DELETE"])
def delete_chart(chart_id):
    charts = load_charts()
    updated_charts = [c for c in charts if c["id"] != chart_id]

    if len(updated_charts) == len(charts):
        return jsonify({"error": "Chart not found"}), 404

    save_charts(updated_charts)
    return jsonify({"message": "Chart deleted"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

