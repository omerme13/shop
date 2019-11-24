import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../ProductItem";
import HeaderButton from "../../HeaderButton";
import StyledButton from "../../StyledButton";

import { addToCart } from "../../../store/actions/cart";
import { colors } from "../../../variables";

const productOverview = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.availableProducts);
    
    const navigateToProductDetail = item => {
        const { id, title } = item;

        props.navigation.navigate("ProductDetail", {
            id,
            title
        });
    };

    const renderProduct = itemData => {
        return (
            <ProductItem
                details={itemData.item}
                navigation={props.navigation}
                pressed={() => navigateToProductDetail(itemData.item)}
            >
                <StyledButton
                    title="View Details"
                    onPress={() => navigateToProductDetail(itemData.item)}
                    background={colors.secondary}
                />
                <StyledButton
                    title="To Cart"
                    onPress={() => dispatch(addToCart(itemData.item))}
                />
            </ProductItem>
        );
    };

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
        headerTitle: "All Products",
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
                    onPress={() => navData.navigation.navigate("Cart")}
                />
            </HeaderButtons>
        )
    };
};

export default productOverview;
