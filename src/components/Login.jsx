// import { useEffect, useRef } from "react";
import styles from "../styles/Form.module.css";


// eslint-disable-next-line react/prop-types
export default function Login({ setMode }) {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <button onClick={() => setMode("unlogged")}>X</button>
                <form action="">
                    <h1>Login</h1>
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

                    <button type="submit" className={styles.btn}>Login</button>

                    <div className={styles.registerLink}>
                        <p>Tidak punya akun? <button onClick={() => setMode("register")}>Register</button></p>
                    </div>
                </form>
            </div>
        </div>
    )
}