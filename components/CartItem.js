import React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import StyledText from "./StyledText";
import Card from "./Card";

const cartItem = props => {
    const { quantity, title, sum } = props.item;

    return (
        <Card style={styles.cartItem}>
            <View style={styles.data}>
                <StyledText style={styles.quantity}>
                    {quantity}&nbsp;
                </StyledText>
                <StyledText style={styles.title}>{title}</StyledText>
                <StyledText style={styles.sum}>{sum}$</StyledText>
            </View>
            {props.isDeleteButton && (
                <View style={styles.deleteButton}>
                    <TouchableNativeFeedback onPress={props.removeCartItem}>
                        <Ionicons name="md-trash" size={23} color="orangered" />
                    </TouchableNativeFeedback>
                </View>
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    data: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        marginRight: 15
    },
    quantity: {
        color: "gray",
        fontSize: 16
    },
    sum: {
        fontFamily: "open-sans-bold"
    },
    title: {
        fontSize: 18,
        marginRight: 25
    },
    deleteButton: {
        marginLeft: "auto"
    }
});

export default cartItem;
