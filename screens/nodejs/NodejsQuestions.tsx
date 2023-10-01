import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import QuizQuestion from '../../components/QuizQuestion';
import QuestionPicker from '../../components/QuestionPicker';

const ONE_HOUR = 3600000;

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const fetchWithCache = async url => {
  const cachedData = await AsyncStorage.getItem(url);
  if (cachedData !== null) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < ONE_HOUR) {
      return data;
    }
  }
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
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      alert('Quiz is complete. Results page is WIP');
      navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.dropdownButton}
        >
          <Text style={styles.dropdownButtonText}>Questions </Text>
        </TouchableOpacity>
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
    <View style={styles.container}>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <QuestionPicker
            questionsCount={questions.length}
            currentQuestionIndex={currentQuestionIndex}
            onSelect={(index) => {
              setCurrentQuestionIndex(index);
              setHasAnswered(false);
              setFeedbackMessage('');
              setShowExplanation(false);
              setHideButton(false);
              setIsModalVisible(false);
            }}
          />
        </View>
      </Modal>
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
            style={styles.explanationContainer} // Define a maxHeight
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1f2720',
  },
  dropdownButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
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
    fontFamily: 'FiraCode-Medium',
  },
  correctChoice: {
    backgroundColor: '#2ecc71',
  },
  incorrectChoice: {
    backgroundColor: '#ff7675',
  },
  showExplanationButton: {
    fontFamily: 'Poppins-Regular',
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
    maxHeight: 120,

  },
  feedbackHeader: {
    fontFamily: 'Poppins-Regular',

    fontSize: 14,
    lineHeight: 22,
    padding: 10,
    color: '#CECECE',

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
    minWidth: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    fontFamily: 'Poppins-Bold',
    color: '#DEF358',
    fontSize: 20,
  },
  nextButton: {
    backgroundColor: '#353d36',
    padding: 5,
    borderRadius: 5,
    minWidth: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevText: {
    fontFamily: 'Poppins-Bold',
    color: '#DEF358',
    fontSize: 20,
  },
});



export default NodejsQuestions;
