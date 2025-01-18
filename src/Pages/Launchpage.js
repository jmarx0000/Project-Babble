import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button.js';
import './Styles/Launchpage.css';

const Launchpage = () => {
  const Navigate = useNavigate();

  const handleButtonClick = () => {
    Navigate('/Homepage');
  };

  return (
    <div className="launch-container">
      <Button title="Sign In" onClick={handleButtonClick} variant="primary" />
    </div>
  );
};

export default Launchpage;

