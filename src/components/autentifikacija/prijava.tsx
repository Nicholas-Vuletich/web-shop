import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './reg.css';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null); // Reset poruka prije nove prijave

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("Prijavljen korisnik:", user);

            if (!user.emailVerified) {
                await signOut(auth);
                setError('Molimo potvrdite svoju e-mail adresu prije prijave.');
                return;
            }

            // Dohvaćanje uloge korisnika iz Firestore-a
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setRole(userData.role || "korisnik"); // Ako uloga ne postoji, default je "korisnik"
            } else {
                setRole("korisnik");
            }

            setSuccessMessage(`Dobrodošli, ${user.email}! Uspješno ste prijavljeni.`);
        } catch (err: any) {
            console.error("Greška prilikom prijave:", err.message);

            if (err.code === "auth/user-not-found") {
                setError("Korisnik ne postoji. Provjerite e-mail adresu.");
            } else if (err.code === "auth/wrong-password") {
                setError("Pogrešna lozinka. Pokušajte ponovo.");
            } else {
                setError("Došlo je do greške prilikom prijave.");
            }
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
            {role && <p className="role">Vaša uloga: {role}</p>}
            {role === "admin" && <p className="admin-badge">👑 Administrator</p>}
        </div>
    );
};

export default SignIn;
