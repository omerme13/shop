export const ADD_ORDER = 'ADD_ORDER';
export const GET_ORDERS = 'GET_ORDERS';

import Order from  '../../models/order';

export const addOrder = (items, totalPrice) => {
    const date = new Date();

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const res = await fetch(`https://react-native-shop-53856.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items,
                totalPrice,
                date: date.toISOString()
            })
        });

        const resData = await res.json();

        dispatch ({
            type: ADD_ORDER,
            items,
            totalPrice,
            date,
            id: resData.name
        })
    }
}

export const getOrders = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        try {
            const res = await fetch(`https://react-native-shop-53856.firebaseio.com/orders/${userId}.json?auth=${token}`); 
            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            const resData = await res.json();
            const fetchedOrders = [];
    
            for (const key in resData) {
                const { items, totalPrice, date } = resData[key];
    
                const order = new Order(key, items, totalPrice, new Date(date));
    
                fetchedOrders.push(order);
            }
    
            dispatch({ 
                type: GET_ORDERS, 
                orders: fetchedOrders
            });

        } catch (err) {
            throw err;
        }
    }
}