import { FETCH_API_DRINKS, FETCH_API_DRINKS_ERROR, FETCH_API_DRINKS_PENDING, DRINK_SELECTED } from "../constants/DrinksActionTypes";

const initialState = {
     drinks: [],
     drinkSelected: "",
     pending: false,
     error: null
}

export default function DrinksReducer(state = initialState, action) {
     switch (action.type) {
          case FETCH_API_DRINKS_PENDING:
               return {
                    ...state,
                    pending: true
               }
          case FETCH_API_DRINKS:
               return {
                    ...state,
                    drinks: action.data,
                    pending: false
               }
          case FETCH_API_DRINKS_ERROR:
               return {
                    ...state,
                    pending: false,
                    error: action.error
               }
          case DRINK_SELECTED:
               return {
                    ...state,
                    drinkSelected: action.payload
               }
          default:
               return state;
     }
}