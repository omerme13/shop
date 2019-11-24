import React from 'react';
import { View, StyleSheet } from 'react-native';

import { colors } from '../variables';

const card = props => (
    <View style={{...styles.card, ...props.style}}>
        {props.children}
    </View>
)

const styles = StyleSheet.create({
    card: {
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        elevation: 3,
        borderRadius: 5,
        marginVertical: 10,
        width: "80%",
        height: 300,
        marginVertical: 10,
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        backgroundColor: colors.primaryLight,
        overflow: "hidden"        
    }
})

export default card;