import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

function UserDetails() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const currUser = auth.currentUser;
        if (currUser)
            setEmail(currUser.email);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const uid = auth.currentUser.uid;
            await setDoc(doc(db, 'users', uid), {
                firstName,
                lastName,
                email,
                phone,
                dob
            });
            alert('Details saved succesfully, navigating you to the home page!');
            navigate('/');
        } catch (err) {
            console.error("Error saving the user details: ", err.message);
            alert("Something went wrong, Please try again later!");
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                <h2>Enter your Details </h2>
                <div>
                    <label>First Name:</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input value={email} disabled />
                </div>
                <button type="submit" style={{ marginTop: '10px', padding: '6px 12px', cursor: 'pointer' }}>
                    Submit
                </button>
            </form>
        </>
    );
};

export default UserDetails;