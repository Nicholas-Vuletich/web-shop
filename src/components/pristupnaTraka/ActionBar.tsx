import React, { useState, useEffect } from 'react';
import { auth } from "../../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './ActionBar.css';
import { FaShoppingCart } from "react-icons/fa";

const ActionBar: React.FC = () => {
  const navigate = useNavigate();
  const [cartCount] = useState(0); // useState mora biti unutar glavne komponente
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser); // Ako je prijavljen i verificiran, postavi korisnika
      } else {
        setUser(null); // Ako nije prijavljen/verificiran, makni korisnika
      }
    });

    return () => unsubscribe(); // Očisti listener kad se komponenta unmounta
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null); // Nakon odjave makni korisnika iz stanja
    navigate("/"); // Preusmjeri korisnika na početnu stranicu
  };

  return (
    <div className="action-bar">
      {/* <div className="cart-icon">
        <FaShoppingCart size={24} />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </div> */}

      {user ? (
        <div className="user-info">
          <span>{user.displayName || user.email}</span> {/* Prikazuje ime ako postoji */}
          <button className="logout-btn" onClick={handleSignOut}>Odjava</button>
        </div>
      ) : (
        <div className="buttons-container">
          <button className="action-button" onClick={() => navigate('/registration')}>Registracija</button>
          <button className="action-button" onClick={() => navigate('/prijava')}>Prijava</button>
        </div>
      )}
      <div className="cart-icon">
        <FaShoppingCart size={24} />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </div>
    </div>
  );
};

export default ActionBar;
