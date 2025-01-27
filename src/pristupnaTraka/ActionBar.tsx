import React from 'react';
import './ActionBar.css';

const ActionBar: React.FC = () => {
  return (
    <div className="action-bar">
      <div className="buttons-container">
        <button className="action-button">Registracija</button>
        <button className="action-button">Prijava</button>
      </div>
    </div>
  );
};

export default ActionBar;

