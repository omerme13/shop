import React from "react";
import { View, StyleSheet, Image, TouchableNativeFeedback } from "react-native";
import { useDispatch } from 'react-redux';

import StyledText from "./StyledText";
import StyledButton from "./StyledButton";

import { addToCart } from '../store/actions/cart';
import { colors } from "../variables";

const productItem = props => {
    const dispatch = useDispatch();

    const navigateToProductDetail = () => {
        props.navigation.navigate("ProductDetail", {
            id,
            title
        });
    }

    const {
        id,
        customerId,
        title,
        imageUrl,
        description,
        price
    } = props.details;

    return (
        <View style={styles.touchable}>
            <TouchableNativeFeedback useForeground onPress={navigateToProductDetail}>
                <View style={styles.productItem}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <StyledText type="title" style={styles.title}>
                        {title}
                    </StyledText>
                    <StyledText type="body" style={styles.price}>
                        {price}$
                    </StyledText>
                    <View style={styles.actions}>
                        <StyledButton
                            title="View Details"
                            onPress={navigateToProductDetail} />
                        <StyledButton 
                            title="To Cart" 
                            onPress={() => dispatch(addToCart(props.details))}
                        />
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    productItem: {
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
        marginLeft: "auto",
        marginRight: "auto",
        marginLeft: "auto",
        alignItems: "center",
        backgroundColor: colors.primaryLight,
        overflow: "hidden"
    },
    image: {
        height: "50%",
        width: "100%"
    },
    title: {
        color: colors.secondary
    },
    price: {
        marginTop: -10,
        color: 'gray'
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginTop: 20
    },
    touchable: {
        overflow: "hidden", 
        borderRadius: 5
    }
});

export default productItem;
