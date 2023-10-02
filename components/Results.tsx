import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;
type ResultsScreenNavigationProp = NavigationProp<RootStackParamList, 'Results'>;

interface ResultsProps {
  route: ResultsScreenRouteProp;
  navigation: ResultsScreenNavigationProp;
}

const Results: React.FC<ResultsProps> = ({ route, navigation }) => {
  const { score, totalQuestions, quizName } = route.params;
  
  const onRetest = () => {
    navigation.navigate(quizName); // Re-navigate to the respective quiz component
  }

  const onGoBack = () => {
    navigation.navigate('Home'); // Navigate back to the Home component/screen
  }

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Your score</Text>
      <Text style={styles.scoreDetail}>{score}/{totalQuestions}</Text>
      <Text style={styles.correct}>Correct answers: {score}</Text>
      <Text style={styles.incorrect}>Incorrect answers: {totalQuestions - score}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetest }>
        <Text style={styles.buttonText}>Re-Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onGoBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f2720',
    padding: 20,
  },
  score: {
    fontSize: 36,
    color: 'white',
    marginBottom: 10,
  },
  scoreDetail: {
    fontSize: 36,
    color: '#DEF358',
    marginBottom: 20,
  },
  correct: {
    fontSize: 18,
    color: '#2ecc71',
    marginBottom: 5,
  },
  incorrect: {
    fontSize: 18,
    color: '#ff7675',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#353d36',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#DEF358',
    fontSize: 18,
  },
});


export default Results;
