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
