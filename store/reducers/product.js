import PRODUCTS from '../../data/data';
import * as actions from '../actions/product';

const initialState = {
    availableProducts: PRODUCTS,
    customerProducts: PRODUCTS.filter(product => product.customerId === 'u1')
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.DELETE_PRODUCT:
            updatedAvailableProducts = state.availableProducts.filter(prod => (
                prod.id !== action.id
            )); 
            updatedCustomerProducts = state.customerProducts.filter(prod => (
                prod.id !== action.id
            )); 

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                customerProducts: updatedCustomerProducts
            }
    }
    return state;
}

export default productReducer;