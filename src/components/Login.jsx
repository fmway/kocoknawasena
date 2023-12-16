// import { useEffect, useRef } from "react";
import GoogleButton from "react-google-button";
import styles from "../styles/Form.module.css";
import { connect } from "react-redux";

const reduxState = (state) => ({
    isLogin: state.isLogin,
})

const reduxDispatch = (dispatch) => ({
    changeUserName: () =>  dispatch({type: 'CHANGE_USER', value: 'wanjing'})
})

// eslint-disable-next-line react/prop-types
function Login({ setMode, isLogin, changeUserName }) {
    
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <button onClick={() => setMode("unlogged")}>X</button>
                <form action="">
                    <h1>Login {isLogin ? "true" : false}</h1>
                    <div className={styles.inputBox}>
                        <input type="email" placeholder="Email" required />
                        <i className='bx bxs-envelope'></i>
                    </div>
                    <div className={styles.inputBox}>
                        <input type="password" placeholder="Password" required />
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <div className={styles.rememberForgot}>
                        <label htmlFor="ingatsaya">
                            <input id="ingatsaya" type="checkbox" />
                            Ingatkan Saya
                        </label>
                        <a href="#">Lupa Password????</a>
                    </div>

                    <button onClick={changeUserName} className={styles.btn}>Login</button>

                    <div className={styles.registerLink}>
                        <p>Tidak punya akun? <button onClick={() => setMode("register")}>Register</button></p>
                    </div>
                    <div className="grid grid-cols-1 justify-items-center">
                        <p className="p-2">atau</p>
                        {/* <GoogleButton onClick={signWithGoogle} /> */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default connect(reduxState, reduxDispatch)(Login)