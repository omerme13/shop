import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../HeaderButton";
import ProductItem from "../../ProductItem";
import StyledButton from '../../StyledButton';

import { colors } from '../../../variables';
import { deleteProduct } from '../../../store/actions/product'

const customerProducts = props => {
    const renderCustomerItem = itemData => (
        <ProductItem details={itemData.item} pressed={() => {}}>
            <StyledButton
                title="Edit"
                onPress={() => {}}
                background={colors.secondary}
            />
            <StyledButton
                title="Delete"
                onPress={() => dispatch(deleteProduct(itemData.item.id))}
            />
        </ProductItem>
    );

    const dispatch = useDispatch();
    const products = useSelector(state => state.product.customerProducts);

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderCustomerItem}
        />
    );
};

customerProducts.navigationOptions = navData => {
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
        )
    };
};

export default customerProducts;
