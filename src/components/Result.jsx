/* eslint-disable react/prop-types */
import styles from "../styles/Result.module.css";

export default function Result(props) {
    return (

    <div className={styles.body}>
        {props.hasil.map(kel => 
            <div className={styles.card} key={kel.nama}>
                <h3>{kel.nama}</h3>
                <ul>
                    {kel.list.map(e => 
                        <li key={e}>{e}</li>
                    )}
                </ul>
            </div>
        )}
    </div>
    );
}