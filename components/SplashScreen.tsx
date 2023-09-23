import React from 'react';
import {View, StyleSheet} from 'react-native';
import Loader from './Loader';

const SplashScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
