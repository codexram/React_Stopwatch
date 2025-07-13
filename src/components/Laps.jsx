import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Laps = ({ laps, theme }) => (
  laps.length > 0 && (
    <motion.div 
      className="laps-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h3>Laps ({laps.length})</h3>
      <div className="laps-list">
        <AnimatePresence>
          {laps.map((lap) => (
            <motion.div
              key={lap.id}
              className="lap-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03, backgroundColor: theme === 'dark' ? '#23272f' : '#e9ecef' }}
            >
              <span className="lap-number">#{lap.id}</span>
              <span className="lap-time">
                {lap.formatted.hours}:{lap.formatted.minutes}:{lap.formatted.seconds}.{lap.formatted.milliseconds}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
);

export default Laps; 