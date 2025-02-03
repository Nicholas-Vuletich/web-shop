import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navigacija/Navbar.js';
import ActionBar from './components/pristupnaTraka/ActionBar.tsx'
import RegistrationPage from './pages/registrationPage'
import SignInPage from "./pages/signInPage.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <ActionBar />
        <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/prijava" element={<SignInPage />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
