import React from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import StyledText from "../../StyledText";
import StyledButton from "../../StyledButton";

import { addToCart } from '../../../store/actions/cart';
import { colors } from "../../../variables";

const productDetail = props => {
    const productId = props.navigation.getParam("id");
    const products = useSelector(state => state.product.availableProducts);
    const selectedProduct = products.find(product => product.id === productId);

    const dispatch = useDispatch();
    return (
        <ScrollView contentContainerStyle={{backgroundColor: colors.secondaryLight, height: '100%'}}>
            <Image
                source={{ uri: selectedProduct.imageUrl }}
                style={styles.image}
            />
            <View style={styles.content}>
                <StyledText type="body" style={styles.price}>
                    {selectedProduct.price}$
                </StyledText>
                <StyledText type="body">
                    {selectedProduct.description}
                </StyledText>
                <StyledButton 
                    title="To Cart" 
                    style={styles.button} 
                    onPress={() => dispatch(addToCart(selectedProduct))}
                />
            </View>

        </ScrollView>
    );
};

productDetail.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam("title")
    };
};

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        padding: 25
    },
    image: {
        width: "100%",
        height: 300
    },
    button: {
        marginVertical: 10
    },
    price: {
        fontSize: 18,
        color: 'gray'
    }
});

export default productDetail;
