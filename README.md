# Recycle Or Not Bot

This project allows users to hold an item in front of their
cameras and receive live feedback on the item's recyclability.

 **Note:** While functional, the current model's accuracy may vary depending on lighting conditions, item positioning, and object types. We are continuously working to improve the detection accuracy and welcome community feedback for enhancement.
___

## Prerequisites
- Node.js and npm installed
- Python 3.8 or higher
- Webcam access

___


## Technologies Used

- **Flask**: Back-end framework used for handling HTTP POST requests to initiate real-time object detection
- **React**: Front-end framework used for building the user interface
- **YOLOv8**: Computer vision model used for object detection and classification in real-time
- **OpenCV**: Library used for camera access, image processing, and drawing detection overlays
___


## Features

1. **Real-Time Object Detection:**
   - Uses YOLOv8 model for live video processing
   - Processes webcam feed to detect objects in real-time
   - Identifies common recyclable items (bottles, cups, tin cans)

2. **Bounding Box Visualization:**
   - Draws green bounding boxes around detected recyclable items
   - Displays red bounding boxes for non-recyclable items
   - Shows confidence scores and class labels for each detection

3. **Class Filtering:**
   - Implements selective detection focusing on recyclable items
   - Filters out irrelevant object classes (e.g., "person", "car")
   - Customizable class list for specific recycling needs


## Setup Instructions

To run this project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/joshmre/computer-vision-webapp.git
cd computer-vision-webapp
```

### 2. Install Dependencies

#### Front-End:
```bash
npm install
```

#### Back-End:
Navigate to the back-end directory (e.g., `server`) and install dependencies:
```bash
cd server
pip install flask
pip install flask-cors
pip install opencv-python
pip install ultralytics
```

### 3. Start the Application

Open two separate terminal windows:

**Terminal 1 (Back-end):**
Navigate to the back-end directory and run:
```bash
cd server
flask run

```
**Terminal 2 (Front-end):**

Navigate to the front-end directory and run the following command:
```bash
npm start
```

### 4. Access the Application

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Troubleshooting
- If the camera doesn't start, ensure no other applications are using your webcam
- If detection seems off, try adjusting lighting conditions
- For any other issues, please check the open issues or create a new one

---