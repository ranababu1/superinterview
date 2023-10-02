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
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.modalHeader}>Review questions</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => onSelect(currentQuestionIndex)}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                numColumns={5}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.item,
                            currentQuestionIndex === item && styles.selectedItem,
                            item > currentQuestionIndex && styles.disabledItem
                        ]}
                        onPress={() => {
                            if (item <= currentQuestionIndex) {
                                onSelect(item);
                            }
                        }}
                        disabled={item > currentQuestionIndex}
                    >
                        <Text style={styles.itemText}>{item + 1}</Text>
                    </TouchableOpacity>
                )}
            />
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
    },
    modalHeader: {
        color: 'white',
        fontSize: 20,
    },
    item: {
        padding: 25,
        borderRadius: 5,
        margin: 2,
        minWidth: 70,
        backgroundColor: '#353d36',
    },
    selectedItem: {
        backgroundColor: '#2ecc71',
    },
    disabledItem: {
        opacity: 0.5,
    },
    itemText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    closeButton: {
        padding: 10,
    },
    closeButtonText: {
        fontSize: 20,
        color: '#ff7675',
    },
});

export default QuestionPicker;
