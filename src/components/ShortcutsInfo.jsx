import React from 'react';
import { motion } from 'framer-motion';

const ShortcutsInfo = () => (
  <motion.div 
    className="shortcuts-info"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.7 }}
  >
    <p>Space: Start/Stop • L: Lap • R: Reset</p>
  </motion.div>
);

export default ShortcutsInfo; 