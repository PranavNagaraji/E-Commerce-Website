import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { auth, db } from '../firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await authService.signUp(email, password);
            alert('Google sign up successful, redirecting you to the user Details Page!');
            navigate('/userdetails');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignUp = async () => {
        setError('');
        try {
            await authService.signInWithProvider();
            const uid = auth.currentUser.uid;
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
                alert("An Account in this id already Exists, redirecting you!");
                navigate("/");
            } else {
                alert('Google sign up successful, redirecting you to the user Details Page!');
                navigate('/userdetails')
            }
        } catch (err) {
            setError(err.message);
        }
    }

    const goToLogin = () => navigate('/login');

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Sign Up</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Email:</label><br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" style={{ marginTop: '10px' }}>Sign Up</button>
            <button
                type="button"
                onClick={handleGoogleSignUp}
                style={{
                    marginTop: '10px',
                    marginLeft: '10px',
                    padding: '6px 12px',
                    cursor: 'pointer'
                }}
            >
                Sign Up with Google
            </button>
            <p style={{ marginTop: '15px' }}>
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={goToLogin}
                    style={{
                        color: 'blue',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                    }}
                >
                    Log In
                </button>
            </p>
        </form>
    );
}

export default SignUpPage;
