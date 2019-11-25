import PRODUCTS from '../../data/data';
import * as actions from '../actions/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.customerId === 'u1')
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.DELETE_PRODUCT:
            updatedAvailableProducts = state.availableProducts.filter(prod => (
                prod.id !== action.id
            )); 
            updatedUserProducts = state.userProducts.filter(prod => (
                prod.id !== action.id
            )); 

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
    }
    return state;
}

export default productReducer;