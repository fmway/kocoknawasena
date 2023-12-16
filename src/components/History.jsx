import styles from "../styles/History.module.css";

export default function History() {
    return (
        <div className={styles.body}>
            <div className={styles.cardHistory}>
            <h2>History</h2>
            <ul>
            <li><button>12 Desember 2023</button></li>
            <li><button>11 Desember 2023</button></li>
            <li><button>10 Desember 2023</button></li>
            </ul>
        </div>
        </div>
    );
}