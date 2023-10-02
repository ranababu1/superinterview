import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

const heroGif = require('../assets/media/hero.gif');
const buttons = ['Javascript', 'Reactjs', 'Nodejs', 'Typescript'];

const Home = ({ navigation }) => {
  const [visibleIndex, setVisibleIndex] = useState(-1); // Initially, none of the buttons are visible

  useEffect(() => {
    // Iterate over buttons and make them visible one by one with a delay
    const timeouts = buttons.map((_, index) =>
      setTimeout(() => setVisibleIndex(index), index * 300) // 500ms delay for each button
    );

    // Clear timeouts when the component is unmounted
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <View style={styles.container}>
      <FastImage
        source={heroGif}
        style={[styles.image, { borderRadius: 10 }]}
        resizeMode={FastImage.resizeMode.contain}
      />
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={button}
          onPress={() => navigation.navigate(`${button}Questions`)}
          style={[styles.buttonContainer, { opacity: index <= visibleIndex ? 1 : 0 }]} // Make button visible only if its index is <= visibleIndex
        >
          <Text style={styles.title}>{button}</Text>
        </TouchableOpacity>
      ))}
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
    padding: 10,
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    textAlign: 'center',
    color: '#cecece',
  },
});

export default Home;
