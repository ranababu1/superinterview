import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const JavascriptAdvanced = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]); // State variable to hold fetched topics
  
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        let response = await fetch('https://imrn.dev/api/jsRefresher');
        let data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
    fetchTopics();
  }, []);
  
  if (selectedTopic) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.mainContent}>
          <Text style={styles.contentTitle}>{selectedTopic.topic}</Text>
          <Text style={styles.content}>{selectedTopic.description}</Text>
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
          onPress={() => setSelectedTopic(topic)}>
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
    fontSize: 22,
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
    padding: 10,
  },
});

export default JavascriptAdvanced;
