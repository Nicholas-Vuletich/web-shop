import React, { useState } from 'react';
import { auth } from '../../firebaseConfig'; 
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import './reg.css';

export const Auth: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isValidEmail(email)) {
            setError("Unesite ispravan e-mail.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user); // Šalje verifikacijski e-mail

            setSuccessMessage('Registracija je uspješna! Molimo vas da potvrdite svoju e-mail adresu putem linka koji smo vam poslali. Nakon potvrde, možete se prijaviti.');
            setError(null); // Briše grešku ako postoji
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className='auth-div'>
            <h2 className="form-title">Registracija</h2>
            <form onSubmit={handleRegister}>
                <input 
                    className='form-input'
                    placeholder="Ime..."
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input 
                    className='form-input'
                    placeholder="Prezime..."
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input 
                    className='form-input'
                    placeholder="E-mail..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className='form-input'
                    placeholder="Password..."
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="auth-button" type="submit">Registracija</button>
            </form>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
    );
};

export default Auth;
