import {
     ADDRESS_INPUT , COMBO_SIZE_SELECT , EMAIL_INPUT , MESSAGE_INPUT , 
     NAME_INPUT , PHONE_INPUT , PIZZA_TYPE_SELECT , VOUCHER_INPUT
} from "../constants/CreateModalActionTypes";

const initialState = {
     kichCo: "",
     loaiPizza: "",
     voucher: "",
     hoTen: "",
     email: "",
     soDienThoai: "",
     diaChi: "",
     loiNhan: "",
}

export default function CreateModalReducers(state = initialState, action) {
     switch (action.type) {
          case COMBO_SIZE_SELECT:
               return {
                    ...state,
                    kichCo: action.payload
               }
          case PIZZA_TYPE_SELECT:
               return {
                    ...state,
                    loaiPizza: action.payload
               }
          case VOUCHER_INPUT:
               return {
                    ...state,
                    voucher: action.payload
               }
          case NAME_INPUT:
               return {
                    ...state,
                    hoTen: action.payload
               }
          case EMAIL_INPUT:
               return {
                    ...state,
                    email: action.payload
               }
          case PHONE_INPUT:
               return {
                    ...state,
                    soDienThoai: action.payload
               }
          case ADDRESS_INPUT:
               return {
                    ...state,
                    diaChi: action.payload
               }
          case MESSAGE_INPUT:
               return {
                    ...state,
                    loiNhan: action.payload
               }
          default:
               return state;
     }
}