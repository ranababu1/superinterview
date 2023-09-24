import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const JavascriptOptions = ({navigation}: any) => {

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Advanced')}>
        <Text style={styles.title}>Refresher</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('JavascriptQuestions')}>
        <Text style={styles.title}>Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2720',
  },
  buttonContainer: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#353d36',
    marginBottom: 20,
    padding: 20,
  },

  title: {
    fontFamily: 'Poppins-Regular',

    fontSize: 24,
    textAlign: 'center',
    color: '#cecece',
  },
});

export default JavascriptOptions;
