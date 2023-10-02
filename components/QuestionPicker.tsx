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
        <Text style={styles.modalHeader}>Review questions</Text>
            {/* <TouchableOpacity style={styles.closeButton}> 
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>*/}
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
            </>
    );
};

const styles = StyleSheet.create({

    modalHeader: {
        color: 'white',
        fontSize: 20,
        padding: 10,
        textAlign: 'left',
        marginBottom: 10,
    },
    item: {
        padding: 25,
        borderRadius: 5,
        margin: 2,
        minWidth: 70,
        backgroundColor: '#353d36',
    },
    inactiveItem: {
        backgroundColor: 'grey',
    },
    selectedItem: {
        backgroundColor: '#2ecc71',
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
        fontWeight: 'bold',
        color: 'white',
    },
});

export default QuestionPicker;
