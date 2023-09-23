import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const JavascriptAdvanced = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  if (selectedTopic) {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, padding: 10}}>
          <Text style={styles.content}>{selectedTopic.content}</Text>
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Map through a list of topics and render each one */}
      {advancedTopics.map((topic, index) => (
        <TouchableOpacity
          key={index}
          style={styles.section}
          onPress={() => setSelectedTopic(topic)}>
          <Text style={styles.sectionTitle}>{topic.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Define your topics and their content here
const advancedTopics = [
  {
    title: 'Advanced Functions',
    content:
      ' First-class functions, Callbacks, Closures, IIFEs, and Arrow functions...',
  },
  {
    title: 'Advanced DOM & Events',
    content: ' Event propagation, Delegation, Creating & removing elements...',
  },
  {
    title: 'Asynchronous JavaScript',
    content: ' Callbacks, Promises, Async/await, AJAX & Fetch API...',
  },
  {
    title: 'Object-Oriented JavaScript',
    content: ' Constructor functions, Prototypes, inheritance, ES6 classes...',
  },
  {
    title: 'Modules & Modular JavaScript',
    content: ' ES6 modules, CommonJS, require()...',
  },
  {
    title: 'Functional Programming Concepts',
    content: ' Map, filter, reduce, Pure functions, side effects...',
  },
  {
    title: 'Error Handling & Debugging',
    content: ' using the debugger statement, Stack traces...',
  },
  {
    title: 'Regular Expressions',
    content: ' Pattern matching, searching, Flags, groups...',
  },
  {
    title: 'ES6 and Beyond Features',
    content: ' Spread & Rest operators, Destructuring, Template literals...',
  },
  {
    title: 'Performance and Optimization',
    content: ' Web performance basics, Profiling, debugging tools...',
  },
  {
    title: 'Advanced Topics and Patterns',
    content: ' Throttling, debouncing, Design patterns...',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
  },
});

export default JavascriptAdvanced;
