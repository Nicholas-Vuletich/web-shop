import React from "react";
import Navbar from './navigacija/Navbar.js';
import Auth from "./autentifikacija/auth";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Auth />
    </div>
  );
};

export default App;
