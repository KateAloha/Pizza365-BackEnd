import { FETCH_ORDERS_ERROR, FETCH_ORDERS_PENDING, FETCH_ORDERS_SUCCESS, PAGINATION_CHANGE } from "../constants/DataTableActionTypes";

const initialState = {
     orders: [],
     totalPage: 0,
     currentPage: 1,
     error: null,
     pending: false
}

// Số dòng trên 1 trang
const rowNumber = 10; 

export default function DataTableReducers(state = initialState, action) {
     switch (action.type) {
          case FETCH_ORDERS_SUCCESS:
               return {
                    ...state,
                    orders: action.payload.slice((state.currentPage - 1) * rowNumber, state.currentPage * rowNumber),
                    totalPage: Math.ceil(action.payload.length / rowNumber),
                    pending: false
               }
          case FETCH_ORDERS_PENDING:
               return {
                    ...state,
                    pending: true
               }
          case FETCH_ORDERS_ERROR:
               return {
                    ...state,
                    error: action.error,
                    pending: false
               }
          case PAGINATION_CHANGE:
               return {
                    ...state,
                    currentPage: action.payload
               }
          default:
               return state;
     }
}

