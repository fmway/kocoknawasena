/* eslint-disable no-unused-vars */
import { useState } from "react";
import styles from "../styles/Form.module.css";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import GoogleButton from "react-google-button";
import { connect } from "react-redux";

const reduxState = (state) => ({
    userName: state.user,
})

// eslint-disable-next-line react/prop-types
function Register({ setMode, userName }) {
    const [, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submit = (e) => {
        e.preventDefault();
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.dir(user);
            })
            .catch(e => {
                const errorCode = e.code;
                const errorMessage = e.message;
                console.log(errorCode, errorMessage);
            })
    };

    const signWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log(user.email);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    };
    return (
        
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <button onClick={() => setMode("unlogged")}>X</button>
                <form action="">
                    <h1>Register: {userName}</h1>
                    <div className={styles.inputBox}>
                        <input type="text"placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className={styles.inputBox}>
                        <input type="email"placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                        <i className='bx bxs-envelope'></i>
                    </div>
                    <div className={styles.inputBox}>
                        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <div className={styles.rememberForgot}>
                        <label htmlFor="ingatsaya">
                            <input id="ingatsaya" type="checkbox" />
                            Ingatkan Saya
                        </label>
                    </div>

                    <button type="submit" onClick={submit} className={styles.btn}>Register</button>

                    <div className={styles.registerLink}>
                        <p>Sudah punya akun? <button onClick={() => setMode("login")}>Login</button></p>
                    </div>

                    <div className="grid grid-cols-1 justify-items-center">
                        <p className="p-2">atau</p>
                        <GoogleButton onClick={signWithGoogle} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default connect(reduxState, null)(Register);