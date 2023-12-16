/* eslint-disable react/prop-types */
import styles from "../styles/Profile.module.css";

export default function Profile(props) {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.profileBox}>
                    <i className="bx bxs-user-circle"></i>
                    <h3>{props.name}</h3>
                    <p>PSTI 2022</p>
                    <button type="submit" className={styles.btn}>MyHistory</button>
                    <div className={styles.set}>
                        <button type="submit" className={styles.sett}>
                            <i className="bx bxs-cog" />
                        </button>
                    </div>
                    <div className={styles.profileBottom}>
                        <p>{`"${props.kataKata || "Waduh"}"`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}