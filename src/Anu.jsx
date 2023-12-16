/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import History from './components/History';
import Result from './components/Result';
import { auth } from "./utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';



export default function App(props) {
  let listKelompok = [
    {
      nama: "Kelompok 1",
      list: [
        "Prabowo",
        "Dedi Mulyadi",
        "Ridwan Kamil",
        "Moh Fikri"
      ]
    },
    {
      nama: "Kelompok 2",
      list: [
        "Ganjar",
        "Mahfud",
        "Megawhatt",
        "Hilma"
      ]
    },
    {
      nama: "Kelompok 3",
      list: [
        "Anies",
        "Cak Imin",
        "Udin",
        "Petot"
      ]
    },
    {
      nama: "",
      list: []
    }
  ];
  const firebase = useFirebase();
  const createNewUser = ({ username, email, password }) => {
    firebase.createUser({ email, password }, { username, email });
  };
  
  const coba = () => {
    console.log("waduh");
    console.dir(firebase);
    // firebase.createUser({ email: "namaku1801@gmail.com", password: 'suanjingbanget' }). then(v => console.log(v.email)).catch(e => console.dir(e));
    createNewUser({ email: 'namaku1801@gmail.com', password: 'asuasu', username: 'namaku1801' });
    //createUserWithEmailAndPassword(auth, "namaku@gmail.com", "passwordkuh").then(x => {
    //   console.log(x.user.email)
    // })
  };
  return (
    // <Home />
    // <History name={"Fauzan"} kataKata={"Agar silaturrahmi tidak putus, Bolehkah pinjam seratus? loremi ipsum dolor amet disekolah lagi makan sesuatu yang sudah dimakan lorem ipsum dengan segala cara"} />
    // <History />
    // <Result hasil={listKelompok} />
    // <div>
    //   Halo <br />
    //   <button onClick={coba}>duh</button>
    // </div>
    // <Home {...props} />
    <button onClick={coba}>click</button>
    );
}