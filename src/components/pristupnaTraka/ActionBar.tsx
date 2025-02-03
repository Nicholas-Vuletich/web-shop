import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ActionBar.css';
import { FaShoppingCart } from "react-icons/fa";

const ActionBar: React.FC = () => {
  const navigate = useNavigate();
  const [cartCount] = useState(0); // useState mora biti unutar glavne komponente

  return (
    <div className="action-bar">
      <div className="buttons-container">
        <button className="action-button" onClick={() => navigate('/registration')}>Registracija</button>
        <button className="action-button" onClick={() => navigate('/prijava')}>Prijava</button>
        <div className="cart-icon">
          <FaShoppingCart size={24} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
