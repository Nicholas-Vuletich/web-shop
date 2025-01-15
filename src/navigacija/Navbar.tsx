import { useState } from 'react';
import "./Navbar.css";
import logo from "../assets/images/logo.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navigacija">
            <div className="logo">
            <img src={logo} alt="Logo" />
            </div>
            <ul className={`meni ${menuOpen ? "open" : ""}`}>
                <li><a href="#home">Početna</a></li>
                <li><a href="#about">O nama</a></li>
                <li><a href="#services">Usluge</a></li>
                <li><a href="#contact">Kontakt</a></li>
            </ul>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
