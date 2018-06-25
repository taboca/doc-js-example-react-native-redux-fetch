import Data from '../data_products.json'
import fetch from 'cross-fetch'

export const get_data_products = () => {
  console.log(Data.products);
  return ({
    type: 'GET_DATA_PRODUCTS',
    data: Data.products
  })
}

export const request_fetch_data_products = () => {
  return ({
    type: 'REQUEST_FETCH_DATA_PRODUCTS'
  })
}

export const received_fetch_data_products = (json) => {
  return ({
    type: 'REQUEST_RECEIVED_DATA_PRODUCTS',
    data: json.products.map(item => item)
  })
}


export function fetchPosts() {
  return function (dispatch) {
    dispatch(request_fetch_data_products())
    return fetch('http://www.mgalli.com/development/2018/nettec/data_products.json')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(received_fetch_data_products(json))
      )
  }
}
