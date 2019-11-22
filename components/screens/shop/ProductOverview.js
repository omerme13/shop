import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../ProductItem';
import HeaderButton from '../../HeaderButton';

const productOverview = props => {
    const products = useSelector(state => state.product.availableProducts);
    
    const renderProduct = itemData => {
        return (
            <ProductItem 
                details={itemData.item}
                navigation={props.navigation}
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

productOverview.navigationOptions = navData => {

    return {
            headerTitle: 'All Products',
            headerLeft: (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="menu"
                        iconName="md-menu" 
                        onPress={() => navData.navigation.toggleDrawer()}
                    />
                </HeaderButtons>
            ),
            headerRight: (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="cart"
                        iconName="md-cart" 
                        onPress={() => navData.navigation.navigate('Cart')}
                    />
                </HeaderButtons>
            )
    }
}

export default productOverview;
