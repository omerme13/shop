import React from "react";
import { View, StyleSheet, Image, TouchableNativeFeedback } from "react-native";
import { useDispatch } from 'react-redux';

import StyledText from "./StyledText";
import StyledButton from "./StyledButton";
import Card from './Card';

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
                <Card style={styles.productItem}>
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
                            onPress={navigateToProductDetail} 
                            background={colors.secondary}
                        />
                        <StyledButton 
                            title="To Cart" 
                            onPress={() => dispatch(addToCart(props.details))}
                        />
                    </View>
                </Card>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: "50%",
        width: "100%"
    },
    title: {
        color: colors.primary
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
