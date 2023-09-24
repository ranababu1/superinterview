import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Loader from '../../components/Loader';
import QuizQuestion from '../../components/QuizQuestion';

const ONE_HOUR = 3600000;

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const fetchWithCache = async url => {
  // Try fetching data from cache
  const cachedData = await AsyncStorage.getItem(url);
  if (cachedData !== null) {
    const { data, timestamp } = JSON.parse(cachedData);
    // Check if data is younger than 1 hour
    if (Date.now() - timestamp < ONE_HOUR) {
      return data;
    }
  }

  // If cache is old or doesn't exist, fetch from API
  try {
    const response = await fetch(url);
    const result = await response.json();
    // Store the new data in cache
    await AsyncStorage.setItem(
      url,
      JSON.stringify({
        data: result,
        timestamp: Date.now(),
      }),
    );
    return result;
  } catch (error) {
    console.error('Failed fetching data', error);
    throw error;
  }
};

const NodejsQuestions = ({ navigation }: any) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [correctResponses, setCorrectResponses] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
    null,
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchWithCache('https://imrn.dev/api/nodejs')
      .then(data => {
        // console.log('Received data:', data);
        const shuffledData = shuffleArray(data);
        setQuestions(shuffledData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error fetching data:', error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
        fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex, fadeAnim]);
  

  const handleAnswer = (selectedAnswerIndex: number) => {
    setSelectedChoiceIndex(selectedAnswerIndex);

    const correctAnswerIndices = questions[currentQuestionIndex].answer;

    if (correctAnswerIndices.includes(selectedAnswerIndex)) {
      setCorrectResponses(prev => prev + 1);
    }

    setFeedbackMessage(currentQuestion.explanation || '');

    setHasAnswered(true);
    setShowWarning(false);
  };

  const nextQuestion = () => {
    if (!hasAnswered && selectedChoiceIndex === null) {
      setShowWarning(true);
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setHasAnswered(false);
      setFeedbackMessage('');
      setShowExplanation(false);
      setSelectedChoiceIndex(null);
      setHideButton(false);
    } else {
      alert('Reactjs Questions completed');
      navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Picker
          selectedValue={currentQuestionIndex}
          style={styles.pickerContainer}
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue, itemIndex) => {
            setCurrentQuestionIndex(itemIndex);
            setHasAnswered(false);
            setFeedbackMessage('');
            setShowExplanation(false);
            setHideButton(false);
          }}
        >
          {questions.map((_, index) => (
            <Picker.Item
              key={index}
              label={`Q ${index + 1}`}
              value={index}
            />
          ))}
        </Picker>
      ),
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Text style={{ fontSize: 18, color: 'white' }}>
            {currentQuestionIndex + 1}/{questions.length} - {correctResponses}
          </Text>
        </View>
      ),
    });
  }, [navigation, currentQuestionIndex, questions.length, correctResponses]);


  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Loader />
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>

    <View style={styles.container}>
        <View style={styles.mainContent}>
          <QuizQuestion question={currentQuestion.question} />

          {currentQuestion.choices.map((choice, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.choiceButton,
                selectedChoiceIndex === index &&
                  !currentQuestion.answer.includes(index)
                  ? styles.incorrectChoice
                  : currentQuestion.answer.includes(index) && hasAnswered
                    ? styles.correctChoice
                    : null,
              ]}
              onPress={() => !hasAnswered && handleAnswer(index)}>
              <Text style={styles.choiceText}>{choice}</Text>
            </TouchableOpacity>
          ))}

          {showExplanation && (
            <ScrollView
              style={[styles.explanationContainer, { maxHeight: 150 }]} // Define a maxHeight
            >
              <Text style={styles.feedbackHeader}>
                {feedbackMessage && feedbackMessage.split('\n')[0]}
              </Text>
              {feedbackMessage &&
                feedbackMessage
                  .split('\n')
                  .slice(1)
                  .map((line, index) => (
                    <Text key={index} style={styles.feedbackDetail}>
                      {line}
                    </Text>
                  ))}
            </ScrollView>
          )}

          {showWarning && (
            <Text style={styles.warningText}>Question not attempted</Text>
          )}
        </View>

        {hasAnswered && !hideButton && (
          <TouchableOpacity
            onPress={() => {
              setShowExplanation(true);
              setHideButton(true);
            }}
            style={styles.showExplanationButton}>
            <Text style={styles.showExplanationText}>Show Explanation</Text>
          </TouchableOpacity>
        )}

        {/* Footer */}
        <View style={styles.footerContainer}>

          <TouchableOpacity
            style={styles.prevButton}
            onPress={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(prev => prev - 1);
                setHasAnswered(false);
                setFeedbackMessage('');
                setShowExplanation(false);
                setHideButton(false);
              }
            }}>
            <Text style={styles.prevText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={hasAnswered ? nextQuestion : undefined}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1f2720',
  },
  mainContent: {
    flex: 1,
  },
  choiceButton: {
    padding: 7,
    marginVertical: 5,
    backgroundColor: '#353d36',
    borderRadius: 7,
  },
  choiceText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
    fontFamily: 'FiraCode-Light',
  },
  correctChoice: {
    backgroundColor: '#2ecc71',
  },
  incorrectChoice: {
    backgroundColor: '#ff7675',
  },
  showExplanationButton: {
    padding: 10,
    backgroundColor: '#3A3E45',
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  showExplanationText: {
    color: '#CECECE',
    fontSize: 20,
  },
  explanationContainer: {
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#353d36',
  },
  feedbackHeader: {
    fontSize: 18,
    lineHeight: 24,
    padding: 10,
    color: '#CECECE',
  },
  feedbackDetail: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    color: 'white',
    padding: 10,
  },
  warningText: {
    color: 'red',
    alignSelf: 'center',
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#353d36',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#DEF358',
    fontSize: 20,
  },
  pickerContainer: {
    width: 150,
    color: 'white',
    backgroundColor: 'transparent',
  },
  pickerItem: {
    color: 'white',
  },
  prevButton: {
    backgroundColor: '#353d36',
    padding: 5,
    borderRadius: 5,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: '#DEF358',
    fontSize: 20,
  },
  nextButton: {
    backgroundColor: '#353d36',
    padding: 5,
    borderRadius: 5,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevText: {
    color: '#DEF358',
    fontSize: 20,
  },
});



export default NodejsQuestions;
