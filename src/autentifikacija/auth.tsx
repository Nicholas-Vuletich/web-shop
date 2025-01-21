import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; 

export const Auth: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const signIn = async () => {
    await createUserWithEmailAndPassword(auth, email, password)  
    }

    return (
        <div>
            <input placeholder="E-mail..." onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password..." type="password" onChange={(e) => setpassword(e.target.value)}/>
            <button onClick={signIn}>Registracija</button>
        </div>
    )
};

export default Auth;