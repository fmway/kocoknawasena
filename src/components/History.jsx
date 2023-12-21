/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "../styles/History.module.css";
import { connect } from "react-redux";
import { database } from "../utils/firebase";
import { onValue, ref } from "firebase/database";


const reduxState = state => ({
    popup: state.popup,
    isLogin: state.isLogin,
    idUser: state.idUser,
    user: state.user,
});

const reduxDispatch = dispatch => ({
    setPopup: (value) => dispatch({ type: 'CHANGE_POPUP', value }),
    setKelompok: (value) => dispatch({ type: 'CHANGE_KELOMPOK', value }),
    setIdHistory: (value) => dispatch({ type: 'CHANGE_IDHISTORY', value }),
})

function History(props) {
    const [history, setHistory] = useState([]);
    const [tanggal, setTanggal] = useState([]);
    const [mode, setMode] = useState(false);
    const [target, setTarget] = useState(null);

    const getDataKelompok = (tanggal, idUser="") => {
        const dbRef = ref(database, `history/${tanggal}`);
        onValue(dbRef, (snapshot) => {
            const res = [];
            snapshot.forEach(x => {
                if (idUser == "")
                    res.push({key: x.key, ...x.val()});
                else {
                    const val = x.val();
                    if (val.id_user == idUser) {
                        res.push({key: x.key, ...x.val()});
                    }
                }
            });
            setHistory(res);
        });
    };

    const getAllTanggal = () => {
        if (props.popup == "allhistory") {
            const dbRef = ref(database, 'history');
            onValue(dbRef, (snapshot) => {
                const res = [];
                snapshot.forEach(x => {
                    res.push(x.key);
                });
                setTanggal(res);
            })
        } else {
            const dbRef = ref(database, 'history');
            onValue(dbRef, (snapshot) => {
                const res = [];
                snapshot.forEach(x => {
                    for (const el of Object.values(x.val())) {
                        if (el.id_user == props.idUser && !res.includes(x.key)) {
                            res.push(x.key);
                        }
                    }
                })
                setTanggal(res);
            })
        }
    }

    const handleHistory = (e, dat) => {
        setTarget(dat);
        props.popup == "history" ? getDataKelompok(e, props.idUser) : getDataKelompok(e);
        setMode(true);
    }

    useEffect(() => getAllTanggal(), []);

    useEffect(() => console.log(history), [history]);

    return (
        <div className={styles.body}>
            <div className={styles.cardHistory}>
                {!mode && <>
                <h2>{props.popup == "history" ? "My History" : "History"}</h2>
                <ul>
                {tanggal.reverse().map(e => {
                    const dat = new Date(e).toLocaleDateString('id-ID', { weekday:"long", year:"numeric", month:"long", day:"numeric"});
                    return (<li key={e}>
                        <button onClick={() => handleHistory(e, dat)}>{dat}</button>
                    </li>)
                })}
                </ul> </>}
                {mode && <>
                <h2>{target}</h2>
                <ul>
                {history.map(el => (
                    <li key={el.key}>
                        <button onClick={() => {
                            props.setKelompok({judul: el.judul, list: el.hasil}); 
                            props.setIdHistory(el.key); 
                            props.setPopup('result')}}>{el.judul} by {el.creator}</button>
                    </li>)
                )}
                </ul>
                </>}
            </div>
            <div onClick={() => props.setPopup("")} className="w-screen fixed z-10 h-screen top-0 left-0"></div>
        </div>
    );
}

const Pages = connect(reduxState, reduxDispatch)(History);

export default Pages;