import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../HeaderButton";
import ProductItem from "../../ProductItem";
import StyledButton from '../../StyledButton';

import { colors } from '../../../variables';
import { deleteProduct } from '../../../store/actions/product'

const userProducts = props => {
    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', { id });
    } 

    const renderCustomerItem = itemData => (
        <ProductItem 
            details={itemData.item} 
            pressed={() => editProductHandler(itemData.item.id)}
        >
            <StyledButton
                title="Edit"
                onPress={() => editProductHandler(itemData.item.id)}
                background={colors.secondary}
            />
            <StyledButton
                title="Delete"
                onPress={() => dispatch(deleteProduct(itemData.item.id))}
            />
        </ProductItem>
    );

    const dispatch = useDispatch();
    const products = useSelector(state => state.product.userProducts);

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderCustomerItem}
        />
    );
};

userProducts.navigationOptions = navData => {
    return {
        headerTitle: "Your Products",
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
                    title="add"
                    iconName="md-create"
                    onPress={() => navData.navigation.navigate('EditProduct')}
                />
            </HeaderButtons>
        )
    };
};

export default userProducts;
