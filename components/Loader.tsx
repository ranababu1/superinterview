import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const Loader = () => {
  const [animations, setAnimations] = useState([]);
  const barCount = 3;

  useEffect(() => {
    const newAnimations = [];
    for (let i = 0; i < barCount; i++) {
      const scaleY = new Animated.Value(1);
      newAnimations.push(scaleY);
    }
    setAnimations(newAnimations);
  }, []);

  useEffect(() => {
    if (animations.length === barCount) {
      animations.forEach((anim, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(index * 120), // Reduced delay for faster animation
            Animated.timing(anim, {
              toValue: 1.5, // Increased toValue for more animation
              duration: 300, // Reduced duration for faster animation
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: 300, // Reduced duration for faster animation
              useNativeDriver: true,
            }),
          ]),
        ).start();
      });
    }
  }, [animations]);

  return (
    <View style={styles.centeredContainer}>
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.loader,
            { transform: [{ scaleY: anim }] },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loader: {
    backgroundColor: '#DEF358',
    marginHorizontal: 5,
    width: 10,
    height: 40,
  },
});

export default Loader;
