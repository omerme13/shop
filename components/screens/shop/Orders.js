import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, ActivityIndicator, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../HeaderButton";
import OrderItem from "../../OrderItem";
import StyledText from "../../StyledText";

import { getOrders } from "../../../store/actions/order";
import { colors } from "../../../variables";

const orders = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const availableOrders = useSelector(state => state.order.orders);

    const loadOrders = useCallback(async () => {
        setError(null);
        setIsLoading(true);

        try {
            await dispatch(getOrders());
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    let content = isLoading ? (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    ) : (
        <FlatList
            data={availableOrders}
            keyExtractor={item => item.id}
            renderItem={itemData => <OrderItem details={itemData.item} />}
        />
    );

    if (!availableOrders.length) {
        content =  (
            <View style={styles.centered}>
                <StyledText>You have no orders yet...</StyledText>
            </View>
        ) 
    }

    return content;
};

orders.navigationOptions = navData => {
    return {
        headerTitle: "Your Orders",
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

const styles = StyleSheet.create({
    orders: {},
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default orders;
