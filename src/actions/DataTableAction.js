import { FETCH_ORDERS_ERROR, FETCH_ORDERS_PENDING, FETCH_ORDERS_SUCCESS, PAGINATION_CHANGE } from "../constants/DataTableActionTypes";

export function paginationAction(value) {
     return {
          type: PAGINATION_CHANGE,
          payload: value
     }
}

export const fetchAPIOrders = () => async dispatch => {
     var requestOptions = {
          method: 'GET',
          redirect: 'follow'
     }
     await dispatch({
          type: FETCH_ORDERS_PENDING
     });
     try {
          const res = await fetch("http://203.171.20.210:8080/devcamp-pizza365/orders", requestOptions);
          const data = await res.json();
          // console.log(data);
          return dispatch({
               type: FETCH_ORDERS_SUCCESS,
               payload: data
          })
     }
     catch (err) {
          return dispatch({
               type: FETCH_ORDERS_ERROR,
               error: err
          })
     }
}