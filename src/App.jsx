/* eslint-disable no-unused-vars */
import './App.css';
import Home from './components/Home';


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
  return (
    // <Home />
    // <History name={"Fauzan"} kataKata={"Agar silaturrahmi tidak putus, Bolehkah pinjam seratus? loremi ipsum dolor amet disekolah lagi makan sesuatu yang sudah dimakan lorem ipsum dengan segala cara"} />
    // <History />
    // <Result hasil={listKelompok} />
    // <div>
    //   Halo <br />
    //   <button onClick={coba}>duh</button>
    // </div>
    <Home />
    // <button onClick={coba}>click</button>
    );
}