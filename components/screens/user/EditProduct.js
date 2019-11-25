import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../HeaderButton";
import FormControl from '../../FormControl';
import StyledButton from '../../StyledButton';

const editProduct = props => {
    const id = props.navigation.getParam('id');
    
    if (id) {
        var details = useSelector(state => state.product.userProducts.find(
            prod => prod.id === id
        ));

        var { title, imageUrl, price, description } = details;
    }
    
    const saveChangesHandler = useCallback(() => {
        console.log('changes saved')
    }, []);

    useEffect(() => {
        props.navigation.setParams({saveChanges: saveChangesHandler});
    }, [saveChangesHandler])
    
    return (
        <ScrollView>
            <View style={styles.form}>
                <FormControl label="title" input={id ? title : ''} />
                <FormControl label="image url" input={id ? imageUrl : ''} />
                <FormControl label="price" input={id ? String(price) : ''} />
                <FormControl label="description" input={id ? description : ''} />
                <StyledButton title="" />
            </View>
        </ScrollView>
    );
}

editProduct.navigationOptions = navData => {
    const isProductIdExist = navData.navigation.getParam('id');
    const saveChangesFn = navData.navigation.getParam('saveChanges');

    return {
        headerTitle: isProductIdExist ? 'Edit Product' : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="save"
                    iconName="md-save"
                    onPress={saveChangesFn}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 25
    }
})

export default editProduct;