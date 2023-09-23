import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const JavascriptBasic = () => {
  return (
    <ScrollView style={styles.container}>
      <Section title="Introduction to JavaScript">
        {/* Content for Introduction to JavaScript */}
      </Section>

      <Section title="Setting up the Environment">
        {/* Content for Setting up the Environment */}
      </Section>

      <Section title="Basic Syntax">{/* Content for Basic Syntax */}</Section>

      <Section title="Operators">{/* Content for Operators */}</Section>

      <Section title="Control Structures">
        {/* Content for Control Structures */}
      </Section>

      <Section title="Functions">{/* Content for Functions */}</Section>

      <Section title="Events">{/* Content for Events */}</Section>

      <Section title="Basic DOM Manipulation">
        {/* Content for Basic DOM Manipulation */}
      </Section>

      <Section title="Arrays">{/* Content for Arrays */}</Section>

      <Section title="Objects">{/* Content for Objects */}</Section>

      <Section title="Basic Error Handling">
        {/* Content for Basic Error Handling */}
      </Section>
    </ScrollView>
  );
};

const Section = ({title, children}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#222327',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3B3E45',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#81868B',
  },
});

export default JavascriptBasic;
