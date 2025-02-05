import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import './reg.css';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); 

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user && !user.emailVerified) {
                await signOut(auth); // Odjava ako nije verificiran e-mail
                setError('Molimo potvrdite svoju e-mail adresu prije prijave.');
                return;
            }

            setSuccessMessage(`Dobrodošli, ${user.email}! Uspješno ste prijavljeni.`);;
        } catch (err: any) {
            setError('Neuspješna prijava. Provjerite e-mail i lozinku.');
        }
    };

    return (
        <div className="auth-div">
            <h2 className="form-title">Prijava</h2>
            <form onSubmit={handleSignIn}>
                <input
                    className="form-input"
                    type="email"
                    placeholder="E-mail..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="form-input"
                    type="password"
                    placeholder="Lozinka..."
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="auth-button" type="submit">Prijava</button>
            </form>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
    );
};

export default SignIn;
