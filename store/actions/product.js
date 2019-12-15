import Product from '../../models/product';

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";


export const deleteProduct = id => {
    
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const res = await fetch(`https://react-native-shop-53856.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        dispatch({ 
            type: DELETE_PRODUCT,
            id
        });
    };


};

export const createProduct = product => {
    const { title, description, imageUrl, price, userId } = product;

    return async (dispatch, getState) => {
        const token = getState().auth.token;

        await fetch(`https://react-native-shop-53856.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl, 
                price,
                userId
            })
        });

        dispatch({ 
            type: CREATE_PRODUCT, 
            product 
        });
    };
};

export const updateProduct = (id, product) => {
    const { title, description, imageUrl, price } = product;

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const res = await fetch(`https://react-native-shop-53856.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl, 
                price,
            })
        });

        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        dispatch ({
            type: UPDATE_PRODUCT,
            id,
            product
        });

    }
};

export const getProducts = () => {
    return async (dispatch, getState) => {
        const currUserId = getState().auth.userId;

        try {
            const response = await fetch('https://react-native-shop-53856.firebaseio.com/products.json'); 
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const resData = await response.json();
            const fetchedProducts = [];
    
            for (const key in resData) {
                const { title, imageUrl, description, price, userId } = resData[key];
    
                const product = new Product(
                    key,
                    userId,
                    title, 
                    imageUrl, 
                    description, 
                    price
                );
    
                fetchedProducts.push(product);
            }
    
            dispatch({ 
                type: GET_PRODUCTS, 
                products: fetchedProducts,
                userProducts: fetchedProducts.filter(prod => prod.userId === currUserId)
            });
        } catch(err) {
            throw err;
        }
    }
}
