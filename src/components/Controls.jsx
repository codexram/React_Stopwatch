import React from 'react';
import { motion } from 'framer-motion';

const Controls = ({ isRunning, time, startStopwatch, stopStopwatch, resetStopwatch, addLap }) => (
  <motion.div 
    className="controls"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    <motion.button
      className={`control-button ${isRunning ? 'stop' : 'start'}`}
      onClick={isRunning ? stopStopwatch : startStopwatch}
      whileHover={{ scale: 1.08, boxShadow: '0 0 16px 2px #43e97b, 0 0 32px 8px #38f9d7' }}
      whileTap={{ scale: 0.96 }}
      initial={false}
    >
      {isRunning ? 'Stop' : 'Start'}
    </motion.button>

    <motion.button
      className="control-button reset"
      onClick={resetStopwatch}
      whileHover={{ scale: 1.08, boxShadow: '0 0 16px 2px #ffd200, 0 0 32px 8px #f7971e' }}
      whileTap={{ scale: 0.96 }}
      disabled={time === 0}
    >
      Reset
    </motion.button>

    <motion.button
      className="control-button lap"
      onClick={addLap}
      whileHover={{ scale: 1.08, boxShadow: '0 0 16px 2px #a18cd1, 0 0 32px 8px #fbc2eb' }}
      whileTap={{ scale: 0.96 }}
      disabled={!isRunning}
    >
      Lap
    </motion.button>
  </motion.div>
);

export default Controls; 