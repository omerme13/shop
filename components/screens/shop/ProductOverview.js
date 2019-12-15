import React, { useEffect, useState, useCallback } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../ProductItem";
import HeaderButton from "../../HeaderButton";
import StyledButton from "../../StyledButton";
import StyledText from "../../StyledText";

import { addToCart } from "../../../store/actions/cart";
import { getProducts } from '../../../store/actions/product';
import { colors } from "../../../variables";

const productOverview = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.availableProducts);

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);

        try {
            await dispatch(getProducts());
        } catch(err) {
            setError(err.message)
        }

        setIsRefreshing(false);

    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => setIsLoading(false));
    }, [loadProducts])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts])



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

    let content = isLoading
        ? (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        ) 
        : (
            <FlatList
                onRefresh={loadProducts}
                refreshing={isRefreshing}
                keyExtractor={item => item.id}
                data={products}
                renderItem={renderProduct}
            />
        )
    
    if (!isLoading && !products.length) {
        content = (
            <View style={styles.centered}>
                <StyledText>
                    There are no products yet, please add some.
                </StyledText>
            </View>
        )
    }

    if (error) {
        content = (
            <View style={styles.centered}>
                <StyledText>{error}</StyledText>
                <StyledButton title="Try again" onPress={loadProducts} />
            </View>
        )
    }

    return content;
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default productOverview;
