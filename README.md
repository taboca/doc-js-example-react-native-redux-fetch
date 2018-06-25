# This is part of the "Struggling with JavaScript" aka doc-js book

* https://leanpub.com/doc-js
* If you want to contribute to the book or join me as a coauthor pool, please get in contact mgalli at mgalli dot com subject "doc-js book"

# This example patches a prior sample to have fetch (AJAX) behavior

If you have not setup your infrastructure for launching React Native, check the session/chapter for that (make sure you have $ create-react-native-app in your path and working). The example in this repository is based in the [React Native Redux app bringing a collection of products to the screen](https://github.com/taboca/doc-js-example-react-native-redux-join-fake-store) received a patch to show how it was changed from just loading data using a fake store (local json file) to also incorporate data from a remote json file.

## Patching actions with a fetch method

actions.js was

```
import Data from '../data_products.json'

export const get_data_products = () => {
  console.log(Data.products);
  return ({
    type: 'GET_DATA_PRODUCTS',
    data: Data.products
  })
}

```

Received

```
import fetch from 'cross-fetch'

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


```

## Patching the Component


Was

```
import React from 'react'
import { connect } from 'react-redux'

import {
    Button
} from 'react-native';

const LoadButton = ({ get_data_products }) => {

  function handlePress() {
    get_data_products();
  }

  return (
    <Button
     onPress={ () => { handlePress() } }
     title="Load"
     color="gray"
     accessibilityLabel=""
    />

  )
}

export default connect()(LoadButton)

```

Became

```
import React from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

import {
    View,
    Button
} from 'react-native';

const LoadButton = ({ get_data_products, dispatch}) => {

  function handlePress() {
    get_data_products();
  }

  function handlePress_fetch() {
    dispatch(fetchPosts());
  }

  return (
    <View>
        <Button
           onPress={ () => { handlePress() } }
           title="Load"
           color="gray"
           accessibilityLabel=""
        />

        <Button
           onPress={ () => { handlePress_fetch() } }
           title="Fetch"
           color="gray"
           accessibilityLabel=""
        />

    </View>

  )
}

export default connect()(LoadButton)

```
