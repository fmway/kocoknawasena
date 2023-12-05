import './App.css';

function App() {

  return (
    <>
      <div className='body mx-auto min-h-screen'>
        <nav className='bg-primary drop-shadow-xl' id='nav'>
          <div className='flex justify-between mx-auto px-3 py-1'>
            <div className='text-2xl font-black text-primary'>
              <h1>KOCOK-KOCOK</h1>
              <h1>NAWASENA</h1>
            </div>
            <button className='w-14 h-14 my-auto' id='profile-icon'>
              <svg onMouseEnter={e => e.currentTarget.classList.remove('nav-unhover')} onMouseOverCapture={e => e.currentTarget.classList.add('nav-unhover')} viewBox="0 0 112 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H112V110H0V0Z" fill="white" fillOpacity="0.01"/>
                <path d="M42.6624 98.934C34.8431 96.6476 27.883 92.4028 22.3719 86.7783C24.4278 84.3851 25.6668 81.293 25.6668 77.9167C25.6668 70.3228 19.3988 64.1667 11.6668 64.1667C11.1991 64.1667 10.7367 64.1891 10.2808 64.2331C9.65967 61.2508 9.3335 58.1627 9.3335 55C9.3335 50.2091 10.082 45.5897 11.4703 41.2486C11.5357 41.2496 11.6012 41.25 11.6668 41.25C19.3988 41.25 25.6668 35.0939 25.6668 27.5C25.6668 25.32 25.1502 23.2584 24.2309 21.4271C29.6277 16.4986 36.2147 12.8102 43.5217 10.8236C45.8371 15.281 50.5558 18.3334 56.0002 18.3334C61.4445 18.3334 66.1632 15.281 68.4786 10.8236C75.7857 12.8102 82.3727 16.4986 87.7694 21.4271C86.8501 23.2584 86.3335 25.32 86.3335 27.5C86.3335 35.0939 92.6015 41.25 100.333 41.25C100.399 41.25 100.465 41.2496 100.53 41.2486C101.918 45.5897 102.667 50.2091 102.667 55C102.667 58.1627 102.341 61.2508 101.719 64.2331C101.264 64.1891 100.801 64.1667 100.333 64.1667C92.6015 64.1667 86.3335 70.3228 86.3335 77.9167C86.3335 81.293 87.5725 84.3851 89.6284 86.7783C84.1173 92.4028 77.1572 96.6476 69.338 98.934C67.5334 93.3896 62.2442 89.375 56.0002 89.375C49.7562 89.375 44.467 93.3896 42.6624 98.934Z" fill="#2F88FF" stroke="white" strokeWidth="10" strokeLinejoin="round"/>
                <path d="M56.0003 71.0417C65.021 71.0417 72.3337 63.8596 72.3337 55C72.3337 46.1405 65.021 38.9584 56.0003 38.9584C46.9797 38.9584 39.667 46.1405 39.667 55C39.667 63.8596 46.9797 71.0417 56.0003 71.0417Z" fill="#43CCF8" stroke="white" strokeWidth="10" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </nav>
        <section id='kocok-body' className='grid gap-3 grid-cols-1 mt-12 md:grid-cols-2'>
          <div className='flex flex-col container bg-secondary h-24 w-64 rounded-r-3xl justify-center text-center'>
            <h2 className='text-redery drop-shadow-xl text-xl font-bold'>Buatlah kelompokmu</h2>
            <h2 className='text-redery drop-shadow-xl text-xl font-bold'>dengan jujur dan adil</h2>
          </div>
          <div className='px-4 my-8 md:my-16 text-xl font-bold drop-shadow-xl'>
            <h3 className='text-slate-500'></h3>
            <p className='text-primary'></p>
          </div>
          <form className='px-12'>
            <h3 className='w-full bg-primary rounded-2xl py-1 mb-2 text-white text-center text-lg'>INPUT YOUR TEAM HERE</h3>
            <div className='grid grid-cols-2 gap-2'>
              <input type='text' placeholder='kreator' id='kreator' className='p-2 drop-shadow-xl rounded-2xl bg-secondary flex' />
              <input type='number' placeholder='Jumlah kelompok' id='jumlahkelompok' className='drop-shadow-xl p-2 rounded-2xl bg-secondary flex' />
            </div>
            <textarea placeholder='List Nama' className='h-48 drop-shadow-xl my-4 w-full bg-secondary px-3 rounded-2xl'></textarea>
          </form>
          <div className='flex justify-center items-center'>
            <button className='bg-primary text-white font-semibold text-2xl md:text-4xl mb-8 -mt-3 md:mt-0 p-2 md:p-4 rounded-2xl'>KOCOK</button>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
