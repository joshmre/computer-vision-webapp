from ultralytics import YOLO
import cv2
import numpy as np

def main():
    # Load the pre-trained YOLOv8 model
    model = YOLO('yolov8s.pt')  # you can use 'yolov8s.pt' or 'yolov8m.pt' for better accuracy
    
    # Define recyclable items from COCO dataset
    recyclable_items = [
        'bottle', 'cup', 'wine glass', 'tin can', 'paper', 
        'cardboard', 'book', 'newspaper', 'magazine'
    ]

    camera = cv2.VideoCapture(0)
    
    if not camera.isOpened():
        print("Error: Could not open camera.")
        exit()

    while True:
        success, image = camera.read()
        if not success:
            break

        # Run object detection
        results = model(image)
        
        # Process detections
        for result in results:
            boxes = result.boxes
            for box in boxes:
                # Get box coordinates
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                
                # Get class name
                class_name = result.names[int(box.cls[0])]
                conf = float(box.conf[0])
                
                # Check if detected object is recyclable
                if class_name in recyclable_items and conf > 0.5:
                    # Draw green box for recyclable items
                    cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    label = f"Recyclable: {class_name} ({conf:.2f})"
                    cv2.putText(image, label, (x1, y1-10), 
                              cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                else:
                    # Draw red box for non-recyclable items
                    cv2.rectangle(image, (x1, y1), (x2, y2), (0, 0, 255), 2)
                    label = f"Non-recyclable: {class_name} ({conf:.2f})"
                    cv2.putText(image, label, (x1, y1-10), 
                              cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

        cv2.imshow('Recyclable Object Detection', image)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    camera.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
