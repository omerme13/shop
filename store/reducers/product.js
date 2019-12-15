import PRODUCTS from "../../data/data";
import * as actions from "../actions/product";

const initialState = {
    availableProducts: [],
    userProducts: []
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_PRODUCTS:
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.userProducts
            };

        case actions.DELETE_PRODUCT:
            productsAfterDeletion = state.availableProducts.filter(
                prod => prod.id !== action.id
            );
            userProductsAfterDeletion = state.userProducts.filter(
                prod => prod.id !== action.id
            );

            return {
                ...state,
                availableProducts: productsAfterDeletion,
                userProducts: userProductsAfterDeletion
            };

        case actions.CREATE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.concat(
                    action.product
                ),
                userProducts: state.userProducts.concat(action.product)
            };

        case actions.UPDATE_PRODUCT:
            const updatedUserProducts = [...state.userProducts];
            const updatedUserProdIndex = updatedUserProducts.findIndex(
                prod => prod.id === action.id
            );

            const updatedProducts = [...state.availableProducts];
            const updatedProdIndex = updatedProducts.findIndex(
                prod => prod.id === action.id
            );

            updatedUserProducts[updatedUserProdIndex] = action.product;
            updatedProducts[updatedProdIndex] = action.product;

            return {
                ...state,
                userProducts: updatedUserProducts,
                availableProducts: updatedProducts
            };

        default:
            return state;
    }
};

export default productReducer;
