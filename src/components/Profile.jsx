/* eslint-disable react/prop-types */
import { connect } from "react-redux";
import styles from "../styles/Profile.module.css";
import { auth } from "../utils/firebase";

const reduxState = (state) => ({
    isLogin: state.isLogin,
    userName: state.user,
    email: state.email,
    popup: state.popup,
  });

const reduxDispatch = (dispatch) => ({
    setPopup: (value) => dispatch({ type: 'CHANGE_POPUP', value })
});

function Profile(props) {
    const logOut = () => {
        props.setPopup('');
        auth.signOut();
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.profileBox}>
                    <i className="bx bxs-user-circle"></i>
                    <h3>{props.userName}</h3>
                    <p>PSTI 2022</p>
                    <button type="submit" className={styles.btn} onClick={() => props.setPopup('history')}>MyHistory</button>
                    <div className="absolute top-2 right-2">
                        <button type="submit" className="" onClick={logOut}>
                            <i className='bx bx-log-out bx-md'></i>
                        </button>
                        <button type="submit" className="">
                            <i className="bx bxs-cog bx-md" />
                        </button>
                    </div>
                    <div className={styles.profileBottom}>
                        <p>{`"${props.kataKata || "Waduh"}"`}</p>
                    </div>
                </div>
                <div onClick={() => props.setPopup("")} className="w-screen fixed z-10 h-screen top-0 left-0"></div>
            </div>
        </div>
    );
}

const Pages = connect(reduxState, reduxDispatch)(Profile);

export default Pages;