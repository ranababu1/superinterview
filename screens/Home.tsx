import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const heroGif = require('../assets/media/hero.gif');

const Home = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      {/* <Image source={heroGif} style={styles.image} /> */}
      <FastImage
        source={heroGif}
        style={[styles.image, {borderRadius: 10}]}
        resizeMode={FastImage.resizeMode.contain}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('JavascriptOptions')}>
        <Text style={styles.title}>Javascript</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('ReactjsQuestions')}>
        <Text style={styles.title}>ReactJS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('NodejsQuestions')}>
        <Text style={styles.title}>NodeJS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Typescript')}>
        <Text style={styles.title}>Typescript</Text>
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
  image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#3B3E45',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
    marginBottom: 20,
    padding: 20,
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    color: '#cecece',
  },
});

export default Home;
