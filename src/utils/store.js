import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    idUser: '',
    allHistory: false,
    popup: '',
    isLogin: false,
    user: '',
    email: '',
    emailVerified: false,
    alert: '',
    idResult: '',
    kelompok: {
      judul: '',
      list: [],
    },
    listOrang: [],
  };
  
  /**
   * 
   * @param {{popup: boolean, isLogin: boolean, user: string, email: string, alert: string}} state 
   * @param {{type: 'CHANGE_POPUP' | 'CHANGE_ISLOGIN' | 'CHANGE_USER' | 'CHANGE_EMAIL' | 'CHANGE_ALERT', value: any}} action 
   * @returns {{popup: boolean, isLogin: boolean, user: string, email: string, alert: string}}
   */
  const reducer = (state=initialState, action) => {
    if(action.type === 'CHANGE_POPUP') {
      return {
        ...state,
        popup: action.value,
      }
    }
    if (action.type === 'CHANGE_ISLOGIN') {
      return {
        ...state,
        isLogin: action.value,
      }
    }
    if (action.type === 'CHANGE_USER') {
        return {
            ...state,
            user: action.value,
        }
    }
    if (action.type === 'CHANGE_EMAIL') {
      return {
        ...state,
        email: action.value
      }
    }
    if (action.type === 'CHANGE_ALERt') {
      return {
        ...state,
        alert: action.value
      }
    }
    if (action.type === 'CHANGE_EMAILVERIFIED') {
      return {
        ...state,
        emailVerified: action.value,
      }
    }
    if (action.type === 'CHANGE_KELOMPOK') {
      return {
        ...state,
        kelompok: action.value,
      }
    }
    if (action.type === 'CHANGE_ORANG') {
      return {
        ...state,
        listOrang: action.value,
      }
    }
    if (action.type === 'CHANGE_IDUSER') {
      return {
        ...state,
        idUser: action.value,
      }
    }
    if (action.type === 'CHANGE_ALLHISTORY') {
      return {
        ...state,
        idHistory: action.value,
      }
    }
    if (action.type === 'CHANGE_IDRESULT') {
      return {
        ...state,
        idResult: action.value,
      }
    }
    return state;
  };
  
  export const store = configureStore({
    reducer,
  });
  