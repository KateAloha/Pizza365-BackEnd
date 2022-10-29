import { DRINK_SELECTED, FETCH_API_DRINKS, FETCH_API_DRINKS_ERROR, FETCH_API_DRINKS_PENDING } from "../constants/DrinksActionTypes"

export const fetchAPIDrinks = () => async dispatch => {
     var requestOptions = {
          method: 'GET',
          redirect: 'follow'
     }
     await dispatch({
          type: FETCH_API_DRINKS_PENDING
     });
     try {
          const res = await fetch("http://203.171.20.210:8080/devcamp-pizza365/drinks", requestOptions);
          const data = await res.json();
          // console.log(data);
          return dispatch({
               type: FETCH_API_DRINKS,
               data: data
          })
     }
     catch (err) {
          return dispatch({
               type: FETCH_API_DRINKS_ERROR,
               error: err
          })
     }
}

export function selectDrink(value) {
     return {
          type: DRINK_SELECTED,
          payload: value
     }
}