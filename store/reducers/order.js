import * as actions from "../actions/order";
import Order from "../../models/order";

const initialState = {
    orders: []
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_ORDER:
            const order = new Order(
                action.id,
                action.items,
                action.totalPrice,
                action.date
            );

            return {
                ...state,
                orders: [...state.orders, order]
            };
        
        case actions.GET_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
            
        default: return state;    
    }
};

export default orderReducer;
