import React from 'react';
import { motion } from 'framer-motion';

const TimeDisplay = ({ isRunning, formattedTime }) => (
  <motion.div 
    className="time-display"
    animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
    transition={{ duration: 2, repeat: isRunning ? Infinity : 0 }}
  >
    <div className="time-main">
      <motion.span 
        className="time-unit hours"
        key={`hours-${formattedTime.hours}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {formattedTime.hours}
      </motion.span>
      <span className="time-separator">:</span>
      <motion.span 
        className="time-unit minutes"
        key={`minutes-${formattedTime.minutes}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {formattedTime.minutes}
      </motion.span>
      <span className="time-separator">:</span>
      <motion.span 
        className="time-unit seconds"
        key={`seconds-${formattedTime.seconds}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {formattedTime.seconds}
      </motion.span>
      <span className="time-separator">.</span>
      <span className="time-unit milliseconds">
        {formattedTime.milliseconds}
      </span>
    </div>
  </motion.div>
);

export default TimeDisplay; 