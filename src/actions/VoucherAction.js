import { FETCH_API_VOUCHER, FETCH_API_VOUCHER_ERROR, FETCH_API_VOUCHER_PENDING } from "../constants/VoucherActionTypes";

export const fetchAPIDrinks = () => async dispatch => {
     var requestOptions = {
          method: "GET",
          redirect: "follow"
     }

     await dispatch({
          type: FETCH_API_VOUCHER_PENDING
     });

     try {
          const response = await fetch("http://203.171.20.210:8080/devcamp-pizza365/vouchers/", requestOptions);
          const data = await response.json();

          return dispatch({
               type: FETCH_API_VOUCHER,
               data: data
          });
     } catch (err) {
          return dispatch({
               type: FETCH_API_VOUCHER_ERROR,
               error: err
          });
     }
}
