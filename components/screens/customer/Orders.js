import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../HeaderButton';
import OrderItem from '../../OrderItem';

const orders = props => {
    const availableOrders = useSelector(state => state.order.orders);

    return (
        <FlatList
            data={availableOrders}
            keyExtractor={item => item.id}
            renderItem={itemData => <OrderItem details={itemData.item} />} 
        />
    );
}

orders.navigationOptions = navData => {

    return {
        headerTitle: 'Your Orders',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="menu"
                    iconName="md-menu" 
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    orders: {

    }
})

export default orders;