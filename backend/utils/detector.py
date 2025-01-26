from flask import Flask, Response, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import threading

app = Flask(__name__)
CORS(app)

class RecycleDetector:
    def __init__(self):
        self.model = YOLO('yolov8s.pt')
        self.camera = None
        self.is_running = False
        self.thread = None
        self.recyclable_items = [
            'bottle', 'cup', 'wine glass', 'tin can', 'paper', 
            'cardboard', 'book', 'newspaper', 'magazine'
        ]

    def start(self):
        if not self.is_running:
            self.camera = cv2.VideoCapture(0)
            self.is_running = True
            self.thread = threading.Thread(target=self.run_detection)
            self.thread.start()

    def stop(self):
        if self.is_running:
            self.is_running = False
            if self.camera:
                self.camera.release()
            if self.thread:
                self.thread.join()
            cv2.destroyAllWindows()

    def run_detection(self):
        while self.is_running:
            success, image = self.camera.read()
            if not success:
                break

            results = self.model(image)
            
            for result in results:
                boxes = result.boxes
                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                    
                    class_name = result.names[int(box.cls[0])]
                    conf = float(box.conf[0])
                    
                    if class_name == 'person':
                        continue
                    
                    if class_name in self.recyclable_items and conf > 0.5:
                        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
                        label = f"Recyclable: {class_name} ({conf:.2f})"
                        cv2.putText(image, label, (x1, y1-10), 
                                  cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                    else:
                        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 0, 255), 2)
                        label = f"Non-recyclable: {class_name} ({conf:.2f})"
                        cv2.putText(image, label, (x1, y1-10), 
                                  cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

            cv2.imshow('Recyclable Object Detection', image)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

detector = RecycleDetector()

@app.route('/start', methods=['POST'])
def start_detection():
    detector.start()
    return jsonify({"status": "started"})

@app.route('/stop', methods=['POST'])
def stop_detection():
    detector.stop()
    return jsonify({"status": "stopped"})

@app.route('/status', methods=['GET'])
def get_status():
    return jsonify({"is_running": detector.is_running})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
