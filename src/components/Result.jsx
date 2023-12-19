/* eslint-disable react/prop-types */
import { connect } from "react-redux";
import styles from "../styles/Result.module.css";

const reduxState = (state) => ({
    kelompok: state.kelompok,
});

const reduxDispatch = (dispatch) => ({
    setKelompok: (value) => dispatch({ type: 'CHANGE_KELOMPOK', value }),
    setPopup: (value) => dispatch({ type: 'CHANGE_POPUP', value }),
})

function Result(props) {
    console.log(props.kelompok.list)
    return (
    <div className={styles.body}>
        <div className={styles.container}>
        <button className="bg-white p-1 pb-0 text-slate-700 hover:text-slate-400 absolute top-1 right-1" onClick={() => props.setPopup('')}><i className='bx bx-x bx-md'></i></button>
        {props.kelompok.list.map(kel =>
            <div className={styles.card} key={kel.nama}>
                <h3>{kel.nama}</h3>
                <div>
                    <ul>
                        {kel.list.map(e => 
                            <li key={e}>{e}</li>
                        )}
                    </ul>
                </div>
            </div>
        )}
        </div>
    </div>
    );
}

const Pages = connect(reduxState, reduxDispatch)(Result);

export default Pages;