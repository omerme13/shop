import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from '../../ProductItem';
import StyledText from "../../StyledText";

const productOverview = props => {
    const products = useSelector(state => state.product.availableProducts);

    const renderProduct = itemData => {
        return (
            <ProductItem 
                details={itemData.item}
            />
        )
    }


    return (
        <FlatList
            keyExtractor={item => item.id}
            data={products}
            renderItem={renderProduct}
        />
    );
};

productOverview.navigationOptions = {
    headerTitle: 'All Products'
}

export default productOverview;
