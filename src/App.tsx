import React from "react";
import Navbar from './navigacija/Navbar.js';
import ActionBar from './pristupnaTraka/ActionBar.tsx'
// import Auth from "./autentifikacija/auth";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <ActionBar />
    </div>
  );
};

export default App;
