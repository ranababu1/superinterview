import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import Loader from '../../components/Loader';

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
    const {data, timestamp} = JSON.parse(cachedData);
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

const JavascriptQuestions = ({navigation}: any) => {
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

  useEffect(() => {
    fetchWithCache('https://imrn.dev/api/js')
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
      alert('Javascript Questions completed');
      navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <Text style={{fontSize: 18, color: 'white'}}>
            {currentQuestionIndex + 1}/{questions.length} - {correctResponses}
          </Text>
        </View>
      ),
    });
  }, [navigation, currentQuestionIndex, questions.length, correctResponses]);

  if (isLoading) {
    return (
      <View style={{flex: 1}}>
        <Loader />
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
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
          <View style={styles.explanationContainer}>
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
          </View>
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
        <Picker
          selectedValue={currentQuestionIndex}
          style={{width: 150}}
          onValueChange={(itemValue, itemIndex) => {
            setCurrentQuestionIndex(itemIndex);
            setHasAnswered(false);
            setFeedbackMessage('');
            setShowExplanation(false);
            setHideButton(false);
          }}>
          {questions.map((_, index) => (
            <Picker.Item
              key={index}
              label={`JumpTo Q ${index + 1}`}
              value={index}
            />
          ))}
        </Picker>

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
  text: {
    fontFamily: 'Poppins-Regular',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#222327',
  },
  mainContent: {
    flex: 1,
  },
  questionText: {
    fontSize: 28,
    marginTop: 30,
    marginBottom: 40,
    color: 'white',
  },
  choiceButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#003366',
    borderRadius: 7,
  },
  choiceText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
  },
  correctChoice: {
    backgroundColor: 'green',
  },
  incorrectChoice: {
    backgroundColor: 'orange',
  },
  showExplanationButton: {
    padding: 10,
    backgroundColor: '#003366',
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 10,
  },

  showExplanationText: {
    color: 'white',
    fontSize: 20,
  },

  feedbackHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#003366',
  },
  explanationContainer: {
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  feedbackDetail: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    color: 'white',
  },
  warningText: {
    color: 'red',
    alignSelf: 'center',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  footerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  prevButton: {
    backgroundColor: '#002244',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  nextText: {
    color: 'white',
    fontSize: 20,
  },
  nextButton: {
    backgroundColor: '#002244',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  prevText: {
    color: 'white',
    fontSize: 20,
  },
});
export default JavascriptQuestions;
