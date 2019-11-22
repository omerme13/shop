import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import StyledButton from "./StyledButton";
import StyledText from "./StyledText";
import Card from "./Card";
import CartItem from "./CartItem";
import { colors } from "../variables";

const orderItem = props => {
    const [isDetailShown, setIsDetailShown] = useState(false);
    const { totalPrice, items, readableDate } = props.details;

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <StyledText style={styles.price}>
                    {totalPrice.toFixed(2)}$
                </StyledText>
                <StyledText style={styles.date}>{readableDate}</StyledText>
            </View>
            <StyledButton
                title={`${isDetailShown ? 'hide' : 'show'} details`}
                onPress={() => setIsDetailShown(!isDetailShown)}
                background={isDetailShown ? colors.secondary : ''}
            />
            {isDetailShown && (
                <View >
                    {items.map(item => (
                        <CartItem item={item} key={item.id} />
                    ))}
                </View>
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        alignItems: "center",
        height: "auto",
        padding: 10
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        marginBottom: 15
    },
    price: {
        fontFamily: "open-sans-bold",
        fontSize: 18
    },
    date: {
        color: "gray",
        fontSize: 15
    }
});

export default orderItem;
