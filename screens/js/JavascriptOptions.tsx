import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const JavascriptOptions = ({navigation}: any) => {
  const [showRefresherOptions, setShowRefresherOptions] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setShowRefresherOptions(!showRefresherOptions)}>
        <Text style={styles.title}>Javascript Refresher</Text>
      </TouchableOpacity>

      {showRefresherOptions && (
        <View style={styles.subOptionsContainer}>
          <TouchableOpacity
            style={styles.subOptionButton}
            onPress={() => navigation.navigate('Basic')}>
            <Text style={styles.subOptionText}>Basic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subOptionButton}
            onPress={() => navigation.navigate('Advanced')}>
            <Text style={styles.subOptionText}>Advanced</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('JavascriptQuestions')}>
        <Text style={styles.title}>Javascript Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222327',
  },
  buttonContainer: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#3B3E45',
    marginBottom: 20,
    padding: 20,
  },
  subOptionsContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  subOptionButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#3B3E45',
    margin: 5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subOptionText: {
    fontSize: 28,
    textAlign: 'center',
    color: '#cecece',
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    color: '#cecece',
  },
});

export default JavascriptOptions;
