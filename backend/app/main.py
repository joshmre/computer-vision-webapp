from flask import Flask, Response, jsonify
from ultralytics import YOLO
import cv2
import numpy as np

app = Flask(__name__)

# Initialize your model and variables at the global level
model = YOLO('yolov8s.pt')
recyclable_items = [
    'bottle', 'cup', 'wine glass', 'tin can', 'paper', 
    'cardboard', 'book', 'newspaper', 'magazine'
]

def process_frame():
    camera = cv2.VideoCapture(0)
    if not camera.isOpened():
        return {"error": "Could not open camera"}

    success, image = camera.read()
    if not success:
        return {"error": "Could not read frame"}

    # Run object detection
    results = model(image)
    detected_items = []
    
    # Process detections
    for result in results:
        boxes = result.boxes
        for box in boxes:
            class_name = result.names[int(box.cls[0])]
            conf = float(box.conf[0])
            
            if class_name != 'person' and conf > 0.5:
                detected_items.append({
                    "class": class_name,
                    "confidence": conf,
                    "recyclable": class_name in recyclable_items
                })

    camera.release()
    return {"detected_items": detected_items}

@app.route('/api/detect', methods=['GET'])
def detect():
    print("Processing detection request")  # Debug print
    try:
        results = process_frame()
        return jsonify(results)
    except Exception as e:
        print(f"Error in detection: {e}")  # Debug print
        return jsonify({"error": str(e)})

@app.route('/ping', methods=['GET'])
def ping():
    print("Ping received")  # Debug print
    return jsonify({"status": "alive"})

if __name__ == "__main__":
    print("Starting Flask server...")  # Debug print
    app.run(debug=True, port=5000)
