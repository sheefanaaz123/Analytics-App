import jwt
from functools import wraps
from flask import request, jsonify, current_app

def verify_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"message": "Authorization header missing"}), 401

        if not auth_header.startswith("Bearer "):
            return jsonify({"message": "Invalid authorization format"}), 401

        token = auth_header.split(" ")[1]
        secret_key = current_app.config.get("SECRET_KEY")

        if not secret_key:
            return jsonify({"message": "Server configuration error: SECRET_KEY missing"}), 500

        try:
            decoded = jwt.decode(
                token,
                secret_key,
                algorithms=["HS256"]
            )

            request.user = decoded
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated