import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navigacija/Navbar.js';
import ActionBar from './components/pristupnaTraka/ActionBar.tsx'
import RegistrationPage from './pages/registrationPage'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <ActionBar />
        <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
