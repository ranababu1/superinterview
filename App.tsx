import React, {useState, useEffect} from 'react';
import AppNavigator from './navigation/AppNavigator';
import {StyleSheet} from 'react-native';

const App = () => {
  return <AppNavigator />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
});

export default App;
