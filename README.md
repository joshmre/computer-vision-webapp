# Recycle Or Not Bot

This project allows users to hold an item in front of their
cameras and receive live feedback on the item's recyclability

___

## Technologies Used

- **Flask**: Back-end framework used for handling databases and user requests
- **React**: Front-end framework used for building the user interface.
- **YOLOv8**: Computer vision model used for object detection and classification
- **OpenCV**: Library for computer vision programming tools and functions
___

## Features

1. **Real-Time Object Detection:**
Detects recyclable items like bottles, cups, and tin cans from the video feed using YOLOv8.
2. **Bounding Box Visualization:**
Highlights recyclable items with green boxes and non-recyclable items with red boxes.
3. **Class Filtering:**
Filters out irrelevant detections (e.g., "person") to focus on recyclable items.
---

## Setup Instructions

To run this project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
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
**Back-end:**

On the back-end directory run the following command:
```bash
flask run
```
**Front-end:**

Navigate to the front-end directory and run the following command:
```bash
npm start
```

### 4. Access the Application

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---
## Notes for Reviewers

- The application does not require an API key to function.
- To evaluate this application, please clone the repository and run it locally as per the instructions above.
