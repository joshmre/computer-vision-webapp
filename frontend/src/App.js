import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('stopped');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const handleImageUpload = async () => {
    if (!selectedImage) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('XXXXXXXXXXXXXXXXXXXXXXXXXXXX', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/status');
      const data = await response.json();
      setIsRunning(data.is_running);
    } catch (error) {
      console.error('Error checking status:', error);
    }
  };

  const handleToggle = async () => {
    try {
      const endpoint = isRunning ? '/stop' : '/start';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
      });
      const data = await response.json();
      setStatus(data.status);
      setIsRunning(!isRunning);
    } catch (error) {
      console.error('Error toggling detection:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="video-detection">
          <h1>Recyclable Object Detection</h1>
          <button 
            className={`toggle-button ${isRunning ? 'running' : 'stopped'}`}
            onClick={handleToggle}
          >
            {isRunning ? 'Stop Detection' : 'Start Detection'}
          </button>
          <p>Status: {status}</p>
        </div>
        <div className="upload-image">
          <h1>Image Upload Detection</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            id="image-input"
          />
          <label htmlFor="image-input">
            <button
              type="button"
              onClick={() => document.getElementById('image-input').click()}
            >
              Select Image
            </button>
          </label>
          {selectedImage && (
            <div>
              <p>Selected file: {selectedImage.name}</p>
              <button onClick={handleImageUpload}>Upload and Detect</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
