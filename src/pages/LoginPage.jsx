import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { auth, db } from '../firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.logIn(email, password);
            alert('Login Successful!');
            navigate('/');
            setEmail('');
            setPassword('');
        }
        catch (err) {
            if (err.code === 'auth/user-not-found') {
                alert('No account found with this email, Redirecting to sign up Page');
                navigate('/signup');
            }
            else {
                setError(err.message);
            }
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            await authService.signInWithProvider();
            const uid = auth.currentUser.uid;
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
                alert("Login successful");
                navigate("/");
            } else {
                await signOut(auth);
                alert('No account found with this email, Redirecting to sign up Page');
                navigate('/signup');
            }
        }
        catch (err) {
            setError(err.message);
        }
    }

    const goToSignUp = () => navigate('/signup');

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Email:</label><br />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
            </div>
            <div>
                <label>Password:</label><br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            </div>
            <button
                type="submit"
                style={{
                    marginTop: '10px',
                    padding: '6px 12px',
                    cursor: 'pointer'
                }}
            >
                LogIn
            </button>
            <button
                type="button"
                onClick={handleGoogleLogin}
                style={{
                    marginTop: '10px',
                    padding: '6px 12px',
                    marginLeft: '10px',
                    cursor: 'pointer'
                }}
            >
                LogIn with Google
            </button>
            <p style={{ marginTop: '15px' }}>
                Don't have an account?{' '}
                <button
                    type="button"
                    onClick={goToSignUp}
                    style={{
                        color: 'blue',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                    }}
                >
                    Sign Up
                </button>
            </p>
        </form>
    );
}

export default LoginPage;