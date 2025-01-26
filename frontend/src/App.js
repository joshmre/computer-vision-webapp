import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('stopped');
  
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
    } catch (error) {
      console.error('Error toggling detection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="video-detection">
          <h1>Recyclable Object Detection</h1>
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
          <p>Status: {status}</p>
        </div>
        <hr className="divider" />
        <div className="waste-guide">
          <h2>Waste Disposal Guide</h2>
          <div className="waste-categories">
            <div className="waste-category">
              <h3>Recyclable Materials</h3>
              <ul>
                <li>Paper and Cardboard</li>
                <li>Glass Bottles and Jars</li>
                <li>Plastic Containers (Types 1-7)</li>
                <li>Metal Cans and Aluminum</li>
              </ul>
            </div>
            <div className="waste-category">
              <h3>Organic Waste</h3>
              <ul>
                <li>Food Scraps</li>
                <li>Garden Waste</li>
                <li>Coffee Grounds</li>
                <li>Biodegradable Materials</li>
              </ul>
            </div>
            <div className="waste-category">
              <h3>Tips for Proper Recycling</h3>
              <ul>
                <li>Rinse containers before recycling</li>
                <li>Remove caps and lids</li>
                <li>Flatten cardboard boxes</li>
                <li>Check local recycling guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
