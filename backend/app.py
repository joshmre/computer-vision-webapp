from flask import Flask, jsonify
from flask_cors import CORS
from utils.detector import RecycleDetector  # Import your detector class

app = Flask(__name__)
CORS(app)

detector = RecycleDetector()

@app.route('/status', methods=['GET'])
def get_status():
    return jsonify({"is_running": detector.is_running})

@app.route('/start', methods=['POST'])
def start_detection():
    detector.start()
    return jsonify({"status": "started"})

@app.route('/stop', methods=['POST'])
def stop_detection():
    detector.stop()
    return jsonify({"status": "stopped"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
