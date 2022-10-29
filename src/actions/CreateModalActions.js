import {
     ADDRESS_INPUT , COMBO_SIZE_SELECT , EMAIL_INPUT , MESSAGE_INPUT ,
     NAME_INPUT , PHONE_INPUT , PIZZA_TYPE_SELECT , VOUCHER_INPUT
} from "../constants/CreateModalActionTypes";

export function comboSize(value) {
     return {
          type: COMBO_SIZE_SELECT,
          payload: value
     }
}

export function pizzaType(value) {
     return {
          type: PIZZA_TYPE_SELECT,
          payload: value
     }
}

export function voucherId(value) {
     return {
          type: VOUCHER_INPUT,
          payload: value
     }
}


export function fullName(value) {
     return {
          type: NAME_INPUT,
          payload: value
     }
}

export function emailOrder(value) {
     return {
          type: EMAIL_INPUT,
          payload: value
     }
}

export function phone(value) {
     return {
          type: PHONE_INPUT,
          payload: value
     }
}

export function address(value) {
     return {
          type: ADDRESS_INPUT,
          payload: value
     }
}

export function message(value) {
     return {
          type: MESSAGE_INPUT,
          payload: value
     }
}
