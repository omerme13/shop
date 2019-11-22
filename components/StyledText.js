import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { colors } from '../variables';

const findStyle = type => {
    switch(type) {
        case 'title':
            return styles.title;
        case 'body':
            return styles.body;
        default:  return styles.body;    
    }  
}

const bodyText = props => {
    const style = findStyle(props.type);

    return (
        <Text style={{...style, ...props.style}}>
            {props.children}
        </Text>
    );
}

const styles = StyleSheet.create({
    body: {
        fontFamily: 'open-sans',
        fontSize: 15,
        color: colors.text,
        marginVertical: 5


    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
        textTransform: 'capitalize',
        marginVertical: 10,
        color: colors.text
    }
})

export default bodyText;