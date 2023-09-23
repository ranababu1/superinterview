import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const Loader = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const scaleIn = Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });

    const fadeInOut = Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(
      Animated.parallel([scaleIn, fadeInOut], {stopTogether: false}),
    ).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <View style={styles.centeredContainer}>
      <Animated.View
        style={[
          styles.loader,
          {
            transform: [{scale: scaleAnim}],
            opacity: opacityAnim,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.loader,
          {
            transform: [{scale: scaleAnim}],
            opacity: opacityAnim,
            animationDelay: '1s',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loader: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'black',
    position: 'absolute',
  },
});

export default Loader;
