import React, { useState } from 'react';
import { auth } from '../../firebaseConfig'; 
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail} from 'firebase/auth';
import './reg.css';


export const Auth: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Provjerava ispravan format e-maila
      return emailRegex.test(email);
    };

    const signUp = async () => {
      if (!isValidEmail(email)) {
        setError("Unesite ispravan e-mail.");
        return;
      }

        try {
          const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (signInMethods.length > 0) {
            setError("Ovaj email je već registriran.");
          } else {
            await createUserWithEmailAndPassword(auth, email, password);
            setUserCreated(true); 
            setError("");  
          }
        } catch (error) {
          console.error("Greška prilikom registracije:", error);
          setError("Postoji korisnik sa ovim e-mailom.");
        }
      };

    return (
        <div className='auth-div'>
          <nav>
            {}
            {userCreated && (
              <div>
                <p>Dobrodošao, {firstName} {lastName}!</p>
              </div>
            )}
          </nav>
    
          {!userCreated ? (
            <div>
              <h2 className="form-title">Registracija</h2>
              <input className='form-input'
                placeholder="Ime..."
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input className='form-input'
                placeholder="Prezime..."
                onChange={(e) => setLastName(e.target.value)}
              />
              <input className='form-input'
                placeholder="E-mail..."
                onChange={(e) => setEmail(e.target.value)}
              />
              <input className='form-input'
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={signUp}>Registracija</button>
            </div>
            )
         : (
            <div>
              <p>Registracija je uspješno završena!</p>
            </div>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      );
    };

export default Auth;

