import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';

interface QuestionProps {
  question: string;
}

const QuizQuestion: React.FC<QuestionProps> = ({ question }) => {
  return (
    <ScrollView style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    maxHeight: 130,
    borderRadius: 10,
    backgroundColor: '#353d36',
    marginBottom: 40,
  },
  questionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#DEF358',
    padding: 10,
  },
});

export default QuizQuestion;
