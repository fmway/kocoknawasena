/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../utils/firebase";
import { onChildAdded, onValue, push, ref, set } from "firebase/database";
import Profile from "./Profile";
import History from "./History";
import LoginRegister from "./LoginRegister";
import Result from "./Result";
import { connect } from "react-redux";
import { randomKelompok } from "../utils/functions";

const reduxState = (state) => ({
  idUser: state.idUser,
  isLogin: state.isLogin,
  userName: state.user,
  email: state.email,
  popup: state.popup,
  emailVerified: state.emailVerified,
  listOrang: state.listOrang,
  kelompok: state.kelompok,
  idResult: state.idResult,
});

const reduxDispatch = (dispatch) => ({
  setIdUser: (value) => dispatch({ type: 'CHANGE_IDUSER', value }),
  setLogin: (value) => dispatch({ type: 'CHANGE_ISLOGIN', value }),
  setUsername: (value) => dispatch({ type: 'CHANGE_USER', value }),
  setEmail: (value) => dispatch({ type: 'CHANGE_EMAIL', value }),
  setEmailVerified: (value) => dispatch({ type: 'CHANGE_EMAILVERIFIED', value }),
  setPopup: (value) => dispatch({ type: 'CHANGE_POPUP', value }),
  setListOrang: (value) => dispatch({ type: 'CHANGE_ORANG', value }),
  setKelompok: (value) => dispatch({ type: 'CHANGE_KELOMPOK', value }),
  setIdResult: (value) => dispatch({ type: 'CHANGE_IDRESULT', value }),
});

function Home(props) {
  const searchParams = new URLSearchParams(window.location.search);
  const result = searchParams.get('result');

  const isLogin = props.isLogin;
  const [listOrang, setListOrang] = useState('');
  const [jumlahkelompok, setJumlahKelompok] = useState(0);
  const [judulKelompok, setJudulKelompok] = useState('');

  const listOrangToString = (listOrang=[]) => {
    let hasil = "";
    listOrang.sort().forEach(el => hasil += el + "\n");
    return hasil.slice(0, -1);
  }
  const listOrangToArray = () => {
    const hasil = [];
    listOrang.split(/\n/).forEach(e => {
      const str = String(e).trim();
      str != "" && hasil.push(str)
    });
    return hasil;
  };

  const saveDataKelompok = (dataKelompok={}) => {
    const res = {
      judul: dataKelompok.judul,
      hasil: dataKelompok.list,
    };
    if (isLogin) {
      res.id_user = props.idUser;
    }
    res.creator = props.userName;
    const historyListRef = ref(database, `history/${new Date(Date.now()).toISOString().substring(0, 10)}`);
    const newHistoryRef = push(historyListRef);
    set(newHistoryRef, res);
  };

  const doRandom = () => {
    if (judulKelompok.length < 1) {
      alert('isi dulu judul kelompoknya');
      return;
    }
    if (!props.userName) {
      alert('yakin gak pake username?');
      return
    }
    if (!jumlahkelompok) {
      alert('jumlahnya kok 0?');
      return
    }
    const x = listOrangToArray();
    if (!x.length) {
      alert('lah orangnya mana?');
      return
    }
    if (jumlahkelompok > x.length) {
      alert(`yakali orangnya cuman ${x.length} mau dijadiin ${jumlahkelompok} kelompok :(`);
      return
    }
    const hasil = {
      judul: judulKelompok != "" ? judulKelompok : "Tanpa Judul",
      list: randomKelompok(x, jumlahkelompok).map((e, i) => ({ nama: `Kelompok ${i+1}`, list: e })),
    }
    saveDataKelompok(hasil);
    props.setKelompok(hasil);
    props.setPopup('result');
  };

  const getUsername = (email) => {
    const dbRef = ref(database, "users/login");
    // let res = undefined;
    onValue(dbRef, (snapshot) => {
        snapshot.forEach(x => {
            const user = x.val();
            if (user.email == email) {
                props.setUsername(user.username)
            }
        })
    });
    // return res;
  }
  const searchById = (id) => {
    const dbRef = ref(database, 'history');
      onValue(dbRef, (snapshot) => {
        snapshot.forEach(x => {
          onValue(ref(database, 'history/' + x.key), (snapshot) => {
              snapshot.forEach(x => {
                  if (id == x.key) {
                    props.setIdResult(x.key);
                    props.setKelompok(x.val());
                  }
              })
          })
      });
  })
}

  const getKelasB = () => {
    const dbRef = ref(database, "users/B");
    const res = [];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach(x => {
        res.push(x.val());
      })
    })
    setListOrang(listOrangToString((res)));
    return res;
  }

  useEffect(() => {
    onChildAdded(ref(database, "history/" + new Date(Date.now()).toISOString().substring(0, 10)), (data) => {
      props.setIdResult(data.key);
    });
  }, []);
  useEffect(() => {
    if (result) {
      searchById(result);
      props.setPopup('result');
    }
    onAuthStateChanged(auth, user => {
      if (user) {
        getUsername(user.email);
        getUsername(user.email);
        props.setLogin(true);
        props.setEmail(user.email);
        props.setEmailVerified(user.emailVerified);
        props.setIdUser(user.uid);
      } else {
        props.setUsername('');
        props.setLogin(false);
        props.setEmail('');
        props.setEmailVerified(false);
        props.setIdUser('');
        setListOrang(listOrangToString((getKelasB())));
      }
    });
  }, [])

  return (
    <div className={styles.body}>
      <div className='mx-auto min-h-screen relative'>
        <nav className='nav bg-primary drop-shadow-xl' id='nav'>
          <div className='flex justify-between items-center mx-auto px-3 py-1'>
            <div className='text-xl md:text-2xl font-black text-primary'>
              <h1>KOCOK-KOCOK</h1>
              <div className="flex flex-row justify-end" >
                  <img className="w-8" src="/kocok.png" />
                  <h1>NAWASENA</h1>
              </div>
            </div>
            <div className="flex justify-between text-6xl text-white">
              <button onClick={() => props.setPopup('allhistory')} className="mr-1">
                  <i className='bx bx-history bx-lg'></i>
              </button>
              { !isLogin ? 
                  <button onClick={() => props.setPopup('sign in')} className="bg-white text-sm md:text-lg hover:bg-blue-500 text-primary font-semibold hover:text-white p-1 my-auto border border-primary hover:border-white rounded">
                  Login
                  </button>
              :
                  <button onClick={() => props.setPopup('profile')} className='w-14 h-14 my-auto' id='profile-icon'>
                      <i className="bx bx-lg bxs-user-circle" />
                  </button>
              }
              </div>
          </div>
        </nav>
        <div className={props.popup != "" && "h-screen fixed bg-slate-300 blur"}>
          <section id='kocok-body' className='grid gap-3 grid-cols-1 pt-12 md:grid-cols-2'>
            <div className='flex flex-col container bg-secondary h-20 md:h-24 w-56 md:w-64 rounded-r-3xl justify-center text-center'>
              <h2 className='text-redery drop-shadow-xl text-lg md:text-xl font-bold'>Buatlah kelompokmu</h2>
              <h2 className='text-redery drop-shadow-xl text-lg md:text-xl font-bold'>dengan jujur dan adil</h2>
            </div>
            <div className='px-4 my-1 md:my-16 text-xl font-bold drop-shadow-xl'>
              <h3 className='text-slate-500'></h3>
              <p className='text-primary'></p>
            </div>
            <form className='px-8 md:px-12'>
              <input type='text' className='w-full bg-primary rounded-2xl py-1 mb-2 text-white text-center text-lg placeholder:text-white' placeholder="INPUT YOUR TEAM NAME HERE" onChange={(e) => setJudulKelompok(e.target.value)} value={judulKelompok}/>
              <div className='grid grid-cols-2 gap-2'>
                <input type='text' placeholder='kreator' id='kreator' className='p-2 drop-shadow-xl rounded-2xl bg-secondary flex' onChange={(e) => props.setUsername(e.target.value)} value={props.userName} disabled={isLogin} />
                <input type='number' placeholder='Jumlah kelompok' id='jumlahkelompok' className='drop-shadow-xl p-2 rounded-2xl bg-secondary flex' onChange={(e) => setJumlahKelompok(Number(e.target.value))} />
              </div>
              <div className="relative">
                <textarea placeholder='List Nama' className='resize-none h-60 md:h-48 drop-shadow-xl my-2 w-full p-4 bg-secondary px-3 rounded-2xl' onChange={(e) => setListOrang(e.target.value)} value={listOrang}></textarea>
                <button onClick={(e) => (e.preventDefault(), getKelasB())} className="hover:text-slate-400 absolute top-6 right-2">
                  <i className='bx bx-sm bx-refresh'></i>
                </button>
              </div>
            </form>
            <div className='flex justify-center items-center'>
              <div className="relative p-6">
                  <button onClick={doRandom} className='bg-primary text-white font-semibold text-2xl md:text-4xl mb-2 md:mb-8 -mt-3 md:mt-0 p-2 md:p-4 rounded-2xl'>
                      KOCOK
                      <img className="w-10 md:w-16 absolute -top-1 right-2" src="/img/dice.png" />
                  </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      {String(props.popup).includes("sign") && <LoginRegister />}
      {props.popup == "profile" && <Profile kataKata="Berakit Rakit Kita Kehulu, Berenang Renang Kita Ketepian. Bersakit Sakit dahulu, Bersenang Senang Kemudian" />}
      {props.popup == "result" && <Result />}
      {String(props.popup).includes("history") && <History />}
    </div>
  )
}

const Pages = connect(reduxState, reduxDispatch)(Home);

export default Pages;