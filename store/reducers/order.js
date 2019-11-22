import * as actions from "../actions/order";
import Order from "../../models/order";

const initialState = {
    orders: []
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_ORDER:
            const order = new Order(
                new Date().toString(),
                action.items,
                action.totalPrice,
                new Date()
            );

            return {
                ...state,
                orders: [...state.orders, order]
            };

        default: return state;    
    }
};

export default orderReducer;
