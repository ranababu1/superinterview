import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const JavascriptRefresher = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Basic')}>
        <Text style={styles.title}>Basic</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Advanced')}>
        <Text style={styles.title}>Advanced</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#545E75',
  },
  buttonContainer: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
  },
});

export default JavascriptRefresher;
