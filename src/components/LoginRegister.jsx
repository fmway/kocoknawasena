/* eslint-disable react/prop-types */
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, database, db } from "../utils/firebase";
import GoogleButton from "react-google-button";
import styles from "../styles/Form.module.css";
import { connect } from "react-redux";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { onValue, ref, set } from "firebase/database";

const reduxState = (state) => ({
    isLogin: state.isLogin,
    userName: state.user,
    email: state.email,
    popup: state.popup,
    alert: state.alert,
});
  
const reduxDispatch = (dispatch) => ({
    setPopup: (value) => dispatch({ type: 'CHANGE_POPUP', value }),
    setEmail: (value) => dispatch({ type: 'CHANGE_EMAIL', value}),
    setUsername: (value) => dispatch({ type: 'CHANGE_USER', value}),
    setLogin: (value) => dispatch({ type: 'CHANGE_ISLOGIN', value}),
    setAlert: (value) => dispatch({ type: 'CHANGE_ALERT', value }),
});

/* eslint-disable no-unused-vars */
function LoginRegister(props) {
    const title = String(props.popup) == "sign up" ? "Register" : "Login";
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getLogin = () => {
        const dbRef = ref(database, "users/login");
        onValue(dbRef, (snapshot) => {
            snapshot.forEach(x => x);
        })
    }

    

    const getEmail = (username) => {
        const dbRef = ref(database, "users/login");
        onValue(dbRef, (snapshot) => {
            snapshot.forEach(x => {
                const user = x.val();
                console.log(`${user.username} == ${username} -> ${user.username == username}`);
                if (user.username == username) {
                    console.log("oke")
                    setEmail(user.email);
                }
            })
        });
    }

    const getId = (uid) => {
        const dbRef = ref(database, "users/login");
        onValue(dbRef, (snapshot) => {
            snapshot.forEach(x => {
                if (x.key == uid) 
                    return true;
            })
        })
        return false;
    }

    /**
     * @param {Event} e 
     */
    const submit = e => {
        e.preventDefault();
        const sign = props.popup == "sign in" ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
        if (sign === signInWithEmailAndPassword) {
            getEmail(username);
            console.log(email);
            if (email == undefined) {
                alert("Email tidak ditemukan");
                return;
            }
        }
            
        sign(auth, email, password)
        .then(x => {
            const user = x.user;
            const { email } = x.user;
            props.popup == "sign up" && set(ref(database, "users/login/" + user.uid), {
                username,
                email,
            });
            props.setUsername(username);
            props.setEmail(email);
            props.setLogin(true);
            props.setPopup('');
        })
        .catch(e => {
            alert("Hmm, sepertinya passwordmu salah. Atau coba login pake google!")
        });
    }


    const signWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(res => {
                const { email } = res.user;
                const username = email.match(/^([^@]*)@/)[1];
                props.setEmail(email);
                props.setUsername(username);
                if (!getId(res.user.uid)) {
                    set(ref(database, "users/login/" + res.user.uid), {
                        username,
                        email,
                    });
                }
                props.setLogin(true);
                props.setPopup(false);
            })
            .catch(e => {
                console.dir(e);
                props.setLogin(false);
            });
    }

    useEffect(() => getEmail(username), [username]);
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <button className="rounded-full text-slate-700 hover:text-slate-400 absolute top-1 right-1" onClick={() => props.setPopup('')}><i className='bx bx-x bx-sm'></i></button>
                <form action="">
                    <h1>{title}</h1>
                    <div className={styles.inputBox}>
                        <input type="text"placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                        <i className="bx bxs-user"></i>
                    </div>
                    { props.popup == "sign up" && 
                    <div className={styles.inputBox}>
                        <input type="email"placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                        <i className='bx bxs-envelope'></i>
                    </div>}
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

                    <button type="submit" onClick={submit} className={styles.btn}>{title}</button>

                    <div className={styles.registerLink}>
                    {props.popup == "sign up" ?
                        <p>Sudah punya akun? <button onClick={() => props.setPopup("sign in")}>Login</button></p>
                    :
                    <p>Tidak punya akun? <button onClick={() => props.setPopup("sign up")}>Register</button></p>
                    }
                    </div>

                    <div className="grid grid-cols-1 justify-items-center">
                        <p className="p-2">atau</p>
                        <GoogleButton onClick={signWithGoogle} />
                    </div>
                </form>
            </div>
            <div onClick={() => props.setPopup("")} className="w-screen fixed z-10 h-screen top-0 left-0"></div>
        </div>
    );
}

const Pages = connect(reduxState, reduxDispatch)(LoginRegister);

export default Pages;