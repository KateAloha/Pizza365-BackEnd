
import { FETCH_API_VOUCHER, FETCH_API_VOUCHER_ERROR, FETCH_API_VOUCHER_PENDING} from "../constants/VoucherActionTypes";

const initialState = {
     voucherId: [],
     pending: false,
     error: null
}

export default function VoucherReducer(state = initialState, action) {
     switch (action.type) {
          case FETCH_API_VOUCHER_PENDING:
               return {
                    ...state,
                    pending: true
               }
          case FETCH_API_VOUCHER:
               return {
                    ...state,
                    vouchers: action.data,
                    pending: false
               }
          case FETCH_API_VOUCHER_ERROR:
               return {
                    ...state,
                    pending: false,
                    error: action.error
               }
          default:
               return state;
     }
}