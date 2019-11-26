import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../HeaderButton";
import FormControl from "../../FormControl";
import StyledButton from "../../StyledButton";

import Product from "../../../models/product";
import { createProduct, updateProduct } from "../../../store/actions/product";

const editProduct = props => {
    const id = props.navigation.getParam("id");
    const isUpdateState = id;

    if (isUpdateState) {
        const details = useSelector(state => (
            state.product.userProducts.find(prod => prod.id === id)
        ));

        var { title, imageUrl, description, price } = details;
    }


    const [newTitle, setNewTitle] = useState(id ? title : '');
    const [newImageUrl, setNewImageUrl] = useState(id ? imageUrl : '');
    const [newPrice, setNewPrice] = useState(id ? price : '');
    const [newDescription, setNewDescription] = useState(id ? description : '');

    const dispatch = useDispatch();

    const saveChangesHandler = useCallback(
        (productId, newProduct) => {
            if (isUpdateState) {
                dispatch(updateProduct(productId, newProduct));
            } else {
                dispatch(createProduct(newProduct));
            }

            props.navigation.goBack();
    }, []);

    useEffect(() => {
        props.navigation.setParams({ saveChanges: saveChangesHandler });
    }, [saveChangesHandler]);

    useEffect(() => {
        const newProduct = new Product(
            isUpdateState ? id : new Date().toString(),
            "u1",
            newTitle,
            newImageUrl,
            newDescription,
            +newPrice // converts the string into a number
        );

        props.navigation.setParams({ newProduct });
    }, [newTitle, newImageUrl, newPrice, newDescription]);   

    return (
        <ScrollView>
            <View style={styles.form}>
                <FormControl
                    label="title"
                    input={newTitle}
                    set={text => setNewTitle(text)}
                />
                <FormControl
                    label="image url"
                    input={newImageUrl}
                    set={text => setNewImageUrl(text)}
                />
                <FormControl
                    label="price"
                    input={newPrice}
                    set={text => setNewPrice(text)}
                />
                <FormControl
                    label="description"
                    input={newDescription}
                    set={text => setNewDescription(text)}
                />
                <StyledButton title="Hello" />
            </View>
        </ScrollView>
    );
};

editProduct.navigationOptions = navData => {
    const productId = navData.navigation.getParam("id");
    const saveChangesFn = navData.navigation.getParam("saveChanges");
    const newProduct = navData.navigation.getParam("newProduct");

    return {
        headerTitle: productId ? "Edit Product" : "Add Product",
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="save"
                    iconName="md-save"
                    onPress={() => saveChangesFn(productId, newProduct)}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 25
    }
});

export default editProduct;
