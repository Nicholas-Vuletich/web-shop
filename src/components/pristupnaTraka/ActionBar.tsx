import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActionBar.css';

const ActionBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="action-bar">
      <div className="buttons-container">
        <button className="action-button" onClick={() => navigate('/registration')}>Registracija</button>
        <button className="action-button">Prijava</button>
      </div>
    </div>
  );
};

export default ActionBar;

