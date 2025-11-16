from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os, datetime

app = Flask(__name__)
CORS(app)

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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

