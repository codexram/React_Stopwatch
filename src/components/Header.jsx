import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const Header = ({ theme, toggleTheme }) => (
  <motion.header 
    className="header"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    <div className="header-left">
      <h1>Stopwatch</h1>
    </div>
    <div className="header-right">
      <motion.button
        className="theme-toggle"
        onClick={toggleTheme}
        whileHover={{ scale: 1.2, rotate: 20 }}
        whileTap={{ scale: 0.9, rotate: -20 }}
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.button>
    </div>
  </motion.header>
);

export default Header; 