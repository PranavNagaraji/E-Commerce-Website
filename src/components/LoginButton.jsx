import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function LoginButton() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');

    const handleLogin = () => {
        navigate('/login');
    };
    // We define an async function here inside the callback because:
    // 1. Fetching user name depends on the currentUser, which can change on each login.
    // 2. Making the callback itself async would return a Promise, which the observer might not handle properly.
    // Defining and calling an inner async function keeps the callback synchronous
    // and allows us to perform async Firestore fetch safely.
    useEffect(() => {
        const unsubscribe = authService.observeAuth((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const docRef = doc(db, 'users', currentUser.uid);
                getDoc(docRef).then((docSnap) => {
                    if (docSnap.exists()) {
                        setName(docSnap.data().firstName);
                    }
                }).catch((error) => {
                    console.error("Error fetching user name:", error);
                });
            } else {
                setName('');
            }
        });
        return () => unsubscribe();
    }, []);



    const handleLogout = () => {
        authService.logOut();
        setUser(null);
        navigate('/');
    };

    if (!user || !name) {
        return (
            <button onClick={handleLogin} className="LSButton">
                <img src="/user.svg" alt="login/signup" style={{
                    height: '30px',
                    width: '40px',
                }}></img>
                <p style={{
                    textDecoration: 'none',
                    fontSize: '1rem',
                }}>Login/Signup</p>
            </button>
        );
    }
    else {
        return (
            <button onClick={handleLogout} className="LSButton">
                <img src="/user.svg" alt="login/signup" style={{
                    height: '30px',
                    width: '40px',
                }}></img>
                <p style={{
                    textDecoration: 'none',
                    fontSize: '1rem',
                }}>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</p>
            </button>
        );
    }
}

export default LoginButton;
