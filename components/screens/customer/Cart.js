import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import StyledText from '../../StyledText';
import StyledButton from '../../StyledButton';
import CartItem from '../../CartItem';

import {colors} from '../../../variables';
import { removeFromCart } from '../../../store/actions/cart';
import { addOrder } from '../../../store/actions/order';

const cart = props => {
    const dispatch = useDispatch();

    const totalPrice = useSelector(state => state.cart.totalPrice);
    let items = useSelector(state => {
        const itemsArray = [];
        for (let key in state.cart.items) {
            const { quantity, price, title, sum } = state.cart.items[key];
            itemsArray.push({
                id: key,
                quantity,
                price,
                title,
                sum: sum.toFixed(2)
            })
        }

        return itemsArray;
    });

    const removeCartItemHandler = itemToRemove => {
        dispatch(removeFromCart(itemToRemove.id, itemToRemove.sum))
    }

    const orderHandler = () => {
        dispatch(addOrder(items, totalPrice));
    }

    const renderCartItem = itemData => (
        <CartItem
            item={itemData.item}
            removeCartItem={() => removeCartItemHandler(itemData.item)}
            isDeleteButton
        />
    );

    return (
        <View style={styles.cart}>
            <View style={styles.summary}>
                <StyledText style={styles.summaryText}>
                    Total:&nbsp;
                    <StyledText type="title" style={styles.totalPrice}>
                        {totalPrice.toFixed(2)}$
                    </StyledText>
                </StyledText>
                <StyledButton 
                    title="order now" 
                    style={styles.button} 
                    onPress={orderHandler}
                />
            </View>
            <StyledText>
                Items:
            </StyledText>
            <FlatList 
                data={items}
                keyExtractor={item => item.id}
                renderItem={renderCartItem}
                style={styles.list}
            />
        </View>
    );
}

cart.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    cart: {
        flex: 1,
        paddingVertical: 30,
        alignItems: 'center',
    },
    button: {
        marginVertical: 15
    },
    totalPrice: {
        color: colors.secondary
    },
    summary: {
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        elevation: 3,
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 25,
        alignItems: 'center',
        marginBottom: 15
    },
    summaryText: {
        fontSize: 18,
    },
    list: {
        width: '100%'
    }
});

export default cart;

