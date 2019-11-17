import * as actions from '../actions/cart';
import CartItem from '../../models/cartItem';

const initialState = {
    items: {},
    totalPrice: 0
};

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.ADD_TO_CART:
            const {title, price, id} = action.product;
            let item = new CartItem(1, price, title, price);
             
            if (state.items[id]) {
                item = new CartItem(
                    state.items[id].quantity + 1,
                    price,
                    title,
                    state.items[id].sum + state.items[id].price.toFixed(2)
                );
            }
 
            return {
                ...state,
                items: {...state.items, [id]: item },
                totalPrice: state.totalPrice + price
            }
            
        default: return state;
    }
}

export default cartReducer;