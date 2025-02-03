import React, { useState } from 'react';
import './reg.css';

export const SignIn: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className='auth-div'>
            <h2 className="form-title">Prijava</h2>
            <form>
                <input 
                    className='form-input'
                    placeholder="E-mail..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className='form-input'
                    placeholder="Lozinka..."
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Prijava</button>
            </form>
        </div>
    );
};

export default SignIn;
