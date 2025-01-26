import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('stopped');
  const [statusMessage, setStatusMessage] = useState('');
  
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
    setIsLoading(true);
    try {
      const endpoint = isRunning ? '/stop' : '/start';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
      });
      const data = await response.json();
      setStatus(data.status);
      setIsRunning(!isRunning);
      // Set the status message when starting
      if (!isRunning) {
        setStatusMessage('Status: Success! Please check your console for camera. Show item to camera to classify.');
      } else {
        setStatusMessage(''); // Clear message when stopping
      }
    } catch (error) {
      console.error('Error toggling detection:', error);
      setStatusMessage('Error: Failed to start detection. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="App">
    <header className="App-header">
      <div className="content-container">
      <div className="video-detection">
              <h1>🌿Recyclable Object Detection🤠</h1>
              <button 
                className={`toggle-button ${isRunning ? 'running' : 'stopped'}`}
                disabled={isLoading}
                onClick={handleToggle}
              >
                {isLoading ? (
                  <>
                    {isRunning ? 'Stopping...' : 'Starting...'}
                    <div className="spinner" />
                  </>
                ) : (
                  isRunning ? 'Stop Detection' : 'Start Detection'
                )}
              </button>
              {statusMessage && (
                <div className="status-message">
                  {"Please check console for camera. Show item to camera to classify!"}
                </div>
              )}
              <p>Status: {status}</p>
            </div>
      <hr className="divider" />
      <div className="waste-guide">
        <h1 className="waste-guide-heading">Waste Disposal Guide &#10071;</h1>
        <h4>Did you know? Americans throw away enough office paper each year to build a wall from Los Angeles to New York that's about 12 feet high. </h4>
        <div className="waste-categories">
          <div className="waste-category">
            <h2>Recyclable Materials</h2>
            <ul>
              <li>Paper and Cardboard</li>
              <li>Glass Bottles and Jars</li>
              <li>Plastic Containers (Types 1-7)</li>
              <li>Metal Cans and Aluminum</li>
            </ul>
          </div>
          <div className="waste-category">
            <h2>Organic Waste</h2>
            <ul>
              <li>Food Scraps</li>
              <li>Garden Waste</li>
              <li>Coffee Grounds</li>
              <li>Biodegradable Materials</li>
            </ul>
          </div>
          <div className="waste-category">
            <h2>Tips for Proper Recycling</h2>
            <ul>
              <li>Rinse containers before recycling</li>
              <li>Remove caps and lids</li>
              <li>Flatten cardboard boxes</li>
              <li>Check local recycling guidelines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</div>

  );
}

export default App;
