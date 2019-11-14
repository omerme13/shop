import PRODUCTS from '../../data/data';

const initialState = {
    availableProducts: PRODUCTS,
    customerProducts: PRODUCTS.filter(product => product.customerId === 'u1')
}

const productReducer = (state = initialState, action) => {
    return state;
}

export default productReducer;