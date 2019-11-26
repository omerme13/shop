import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import StyledText from './StyledText';

const formControl = props => {
    const [inputValue, setInputValue] = useState(props.input);

    return (
        <View style={styles.formControl}>
            <StyledText style={styles.label}>{props.label}</StyledText>
            <TextInput 
                label={props.label} 
                value={inputValue.toString()} // in case there is a number(price) it becomes invalid
                style={styles.input} 
                onChangeText={text => {
                    setInputValue(text);
                    props.set(text)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 3
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginBottom: 25

    },

})

export default formControl;