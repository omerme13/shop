export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (items, totalPrice) => {
    return {
        type: ADD_ORDER,
        items,
        totalPrice
    }
}