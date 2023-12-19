/* eslint-disable react/prop-types */
import styles from "../styles/History.module.css";
import { connect } from "react-redux";

const reduxState = state => ({
    history: state.history,
});

const reduxDispatch = dispatch => ({
    setPopup: (value) => dispatch({ type: 'CHANGE_POPUP', value }),
})

function History(props) {
    return (
        <div className={styles.body}>
            <div className={styles.cardHistory}>
                <h2>History</h2>
                <ul>
                    <li>
                        <button>12 Desember 2023</button>
                    </li>
                    <li>
                        <button>11 Desember 2023</button>
                    </li>
                    <li>
                        <button>10 Desember 2023</button>
                    </li>
                </ul>
            </div>
            <div onClick={() => props.setPopup("")} className="w-screen fixed z-10 h-screen top-0 left-0"></div>
        </div>
    );
}

const Pages = connect(reduxState, reduxDispatch)(History);

export default Pages;