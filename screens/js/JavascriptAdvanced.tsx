import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const ONE_HOUR = 60 * 60 * 1000;

const fetchWithCache = async (url) => {
  const cachedData = await AsyncStorage.getItem(url);
  if (cachedData !== null) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < ONE_HOUR) {
      return data;
    }
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    await AsyncStorage.setItem(
      url,
      JSON.stringify({
        data: data,
        timestamp: Date.now(),
      })
    );
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const JavascriptAdvanced = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWithCache('https://imrn.dev/api/jsRefresher')
      .then(data => {
        setTopics(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Loader />
      </View>
    );
  }

  if (selectedTopic) {
    return (
      <View style={styles.container}>
        <ScrollView style={[styles.mainContent, styles.descContainer]}>
          <Text style={styles.contentTitle}>{selectedTopic.topic}</Text>
          <Text style={styles.content}>{selectedTopic.description}</Text>
        </ScrollView>
        <ScrollView style={styles.mainContent}>
          <Text style={styles.codeBlock}>{selectedTopic.code_example}</Text>
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {topics.map((topic, index) => (
        <TouchableOpacity
          key={index}
          style={styles.listButton}
          onPress={() => setSelectedTopic(topic)}
        >
          <Text style={styles.listText}>{topic.topic}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
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
  listButton: {
    padding: 7,
    marginVertical: 5,
    backgroundColor: '#353d36',
    borderRadius: 7,
  },
  listText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
    fontFamily: 'Poppins-Regular',
  },
  contentTitle: {
    fontFamily: 'Poppins-Bold',
    
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
  },
  content: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 18,
  },
  codeBlock: {
    fontFamily: 'FiraCode-Medium',
    color: '#DEF358',
    fontSize: 16,
    backgroundColor: '#353d36',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  descContainer: {
    borderRadius: 10,
    backgroundColor: '#353d36',
    marginBottom: 20,
    padding: 20,
  },

});

export default JavascriptAdvanced;
