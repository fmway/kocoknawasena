import styles from "../styles/Form.module.css";

// eslint-disable-next-line react/prop-types
export default function Register({ setMode }) {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <button onClick={() => setMode("unlogged")}>X</button>
                <form action="">
                    <h1>Register</h1>
                    <div className={styles.inputBox}>
                        <input type="text" placeholder="Username" required />
                        <i className="bx bxs-user"></i>
                    </div>
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
                    </div>

                    <button type="submit" className={styles.btn}>Register</button>

                    <div className={styles.registerLink}>
                        <p>Sudah punya akun? <button onClick={() => setMode("login")}>Login</button></p>
                    </div>
                </form>
            </div>
        </div>
    )
}