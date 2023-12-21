/* eslint-disable react/prop-types */
import { connect } from "react-redux";
import styles from "../styles/Result.module.css";
import { shareOnMobile } from "react-mobile-share";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../utils/firebase";

const reduxState = (state) => ({
    kelompok: state.kelompok,
    idResult: state.idResult,
});

const reduxDispatch = (dispatch) => ({
    setKelompok: (value) => dispatch({ type: 'CHANGE_KELOMPOK', value }),
    setPopup: (value) => dispatch({ type: 'CHANGE_POPUP', value }),
    setIdResult: (value) => dispatch({ type: 'CHANGE_IDRESULT', value }),
})


function Result(props) {

    const searchById = (id) => {
        const dbRef = ref(database, 'history');
            onValue(dbRef, (snapshot) => {
                snapshot.forEach(x => {
                    onValue(ref(database, 'history/' + x.key), (snapshot) => {
                        snapshot.forEach(x => {
                            if (id == x.key) {
                                props.setKelompok(x.val());
                            }
                        })
                    })
                });
            })
    }
    const kelompok = props.kelompok.list ? props.kelompok.list : props.kelompok.hasil;

    useEffect(() => {
        if(props.idResult) searchById(props.idResult);
    }, []);


    useEffect(() => console.log(props.idResult));
    return (
    <div className={styles.body}>
        <div className="grid grid-cols-1 gap-2 place-items-center md:block">
            <div className="absolute top-1 right-1 flex flex-col">
                <button title="close" className="bg-white p-1 pb-0 text-slate-700 hover:text-slate-400" onClick={() => {
                    if (new URLSearchParams(window.location.search).get('result')) {
                        props.setIdResult(null);
                        window.location.href = "/";
                    } else {
                        props.setIdResult(null);
                        props.setPopup('');
                    }
                    }}><i className='bx bx-x bx-md'></i></button>
                <button title="share" className="bg-white p-1 pb-0 mt-1 text-slate-700 hover:text-slate-400" onClick={
                    () => shareOnMobile({
                        text: "Hey! Cek kelompok anda",
                        url: `https://kocok.nawasena22.my.id/?result=${props.idResult}`,
                        title: props.kelompok.judul,
                        images: ['/kocok.png'],
                    },
                    () => {
                        navigator.clipboard.writeText(`https://kocok.nawasena22.my.id/?result=${props.idResult}`);
                    }
                    )
                }><i className='bx bx-share bx-md'></i></button>
            </div>
        {kelompok.map(kel =>
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