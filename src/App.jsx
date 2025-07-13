import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import TimeDisplay from './components/TimeDisplay';
import Controls from './components/Controls';
import ShortcutsInfo from './components/ShortcutsInfo';
import Laps from './components/Laps';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [lapCount, setLapCount] = useState(0);
  const [theme, setTheme] = useState('dark'); // Default to dark
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const [precision] = useState(2); // milliseconds precision

  // Format time display
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / Math.pow(10, 3 - precision));
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: milliseconds.toString().padStart(precision, '0')
    };
  };

  // Start stopwatch
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    }
  };

  // Stop stopwatch
  const stopStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  // Reset stopwatch
  const resetStopwatch = () => {
    stopStopwatch();
    setTime(0);
    setLaps([]);
    setLapCount(0);
  };

  // Add lap
  const addLap = () => {
    if (isRunning) {
      const newLap = {
        id: lapCount + 1,
        time: time,
        formatted: formatTime(time)
      };
      setLaps(prev => [newLap, ...prev]);
      setLapCount(prev => prev + 1);
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) {
          stopStopwatch();
        } else {
          startStopwatch();
        }
      } else if (e.code === 'KeyL') {
        e.preventDefault();
        addLap();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        resetStopwatch();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, time]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formattedTime = formatTime(time);

  return (
    <div className={`app ${theme}`}>
      <div className="stopwatch-container">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <TimeDisplay isRunning={isRunning} formattedTime={formattedTime} />
        <Controls
          isRunning={isRunning}
          time={time}
          startStopwatch={startStopwatch}
          stopStopwatch={stopStopwatch}
          resetStopwatch={resetStopwatch}
          addLap={addLap}
        />
        <ShortcutsInfo />
        <Laps laps={laps} theme={theme} />
      </div>
    </div>
  );
}

export default App;
