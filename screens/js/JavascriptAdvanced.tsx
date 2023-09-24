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
    title: 'Closures',
    content: `
Closures are a powerful concept in JavaScript allowing functions to retain access to variables from their outer scope, even after the outer function has finished executing. Useful for creating private variables, implementing design patterns, and writing more reusable and efficient code.

Example:
\`\`\`javascript
function outer() {
  let outerVar = 'I am from outer!';
  function inner() {
    console.log(outerVar); // Accesses the outerVar
  }
  return inner;
}
const closure = outer();
closure(); // Logs: 'I am from outer!'
\`\`\`
`,
  },
  {
    title: 'Prototypal Inheritance',
    content: `
JavaScript uses prototypal inheritance instead of class-based inheritance, meaning that objects are created by cloning other objects, with properties and methods inherited from the prototype object. While making JavaScript very flexible and expressive, it can also be challenging to understand and debug.

Example:
\`\`\`javascript
function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function() {
  console.log(\`Woof! My name is \${this.name}!\`);
};
const myDog = new Dog('Max');
myDog.bark(); // Logs: 'Woof! My name is Max!'
\`\`\`
`,
  },
  {
    title: 'Asynchronous Programming & Event Loop',
    content: `
JavaScript, being single-threaded, can handle asynchronous operations like network requests and file I/O using the event loop. Essential for responsive and user-friendly web applications, but it can be tricky to understand initially.

Example:
\`\`\`javascript
console.log('Start');
setTimeout(() => {
  console.log('Timeout callback');
}, 0);
console.log('End');
// Logs: 'Start', 'End', 'Timeout callback'
\`\`\`
`,
  },
  {
    title: 'Promises',
    content: `
Promises offer a way to manage asynchronous operations, presenting a cleaner alternative to callback hell, making asynchronous code easier to write and maintain.

Example:
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  const success = true;
  if(success) resolve('The operation was successful.');
  else reject('The operation failed.');
});
promise.then(console.log).catch(console.log);
\`\`\`
`,
  },
  {
    title: 'Async/Await',
    content: `
Async/await is syntactic sugar over promises allowing for more readable and synchronous-like asynchronous code without nested callbacks or promise chains.

Example:
\`\`\`javascript
async function fetchData() {
  try {
    let response = await fetch('https://api.example.com/data');
    let data = await response.json();
    console.log(data);
  } catch(error) {
    console.error('Error fetching data:', error);
  }
}
fetchData();
\`\`\`
`,
  },
  {
    title: 'Modules',
    content: `
Modules aid in organizing and reusing JavaScript code by enabling the export and import of variables, functions, and classes, enhancing modularity and maintainability.

Example:
\`\`\`javascript
// module.js
export const myVar = 'I am exported!';
export function myFunction() {
  console.log('I am a exported function!');
}

// main.js
import { myVar, myFunction } from './module';
console.log(myVar); // Logs: 'I am exported!'
myFunction(); // Logs: 'I am a exported function!'
\`\`\`
`,
  },
  {
    title: 'Destructuring',
    content: `
Destructuring in JavaScript allows for extracting values from objects and arrays, simplifying complex assignments and improving readability.

Example:
\`\`\`javascript
const person = { firstName: 'John', lastName: 'Doe' };
const { firstName, lastName } = person;
console.log(firstName, lastName); // Logs: 'John Doe'
\`\`\`
`,
  },
  {
    title: 'Event-Driven Programming',
    content: `
Event-driven programming uses events to control the application flow, suited for developing web applications and user interfaces in JavaScript.

Example:
\`\`\`javascript
document.getElementById('myButton').addEventListener('click', () => {
  console.log('Button Clicked!');
});
\`\`\`
`,
  },
  {
    title: 'Functional Programming',
    content: `
Functional programming emphasizes the use of pure functions and immutable data structures, allowing for more concise, elegant, and efficient code in JavaScript.

Example:
\`\`\`javascript
const array = [1, 2, 3];
const squared = array.map(num => num * num);
console.log(squared); // Logs: [1, 4, 9]
\`\`\`
`,
  },
  {
    title: 'Error Handling',
    content: `
Error handling is crucial in any language. JavaScript offers features like the try/catch statement and the throw keyword for managing errors gracefully.

Example:
\`\`\`javascript
try {
  throw new Error('Something went wrong!');
} catch (error) {
  console.error('Caught an error:', error.message);
}
// Logs: 'Caught an error: Something went wrong!'
\`\`\`
`,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1f2720',
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    borderRadius: 5,

    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  sectionTitle: {
    color: '#DEF358',
    backgroundColor: '#353d36',
    padding: 10,
    borderRadius: 5,

    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    color: 'white',
    fontSize: 18,
  },
});

export default JavascriptAdvanced;
