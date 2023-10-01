import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface QuestionPickerProps {
  questionsCount: number;
  currentQuestionIndex: number;
  onSelect: (index: number) => void;
}

const QuestionPicker: React.FC<QuestionPickerProps> = ({
  questionsCount,
  currentQuestionIndex,
  onSelect,
}) => {
  const data = Array.from({ length: questionsCount }, (_, index) => index);

  return (
    <FlatList
      data={data}
      numColumns={5}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.item,
            currentQuestionIndex === item && styles.selectedItem,
          ]}
          onPress={() => onSelect(item)}
        >
          <Text style={styles.itemText}>{item + 1}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderRadius: 5,
    margin: 2,
    backgroundColor: '#353d36',
  },
  selectedItem: {
    backgroundColor: '#2ecc71',
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QuestionPicker;
