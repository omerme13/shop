import React, { useState } from "react";
import * as Font from 'expo-font';
import { AppLoading } from 'expo'; 
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import productReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    auth: authReducer
});

// TODO remove composeWithDevTools before deployment
const store = createStore(rootReducer, applyMiddleware(ReduxThunk), composeWithDevTools());

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
}

const app = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    if (!isLoaded) {
        return (
            <AppLoading 
                startAsync={fetchFonts} 
                onFinish={() => setIsLoaded(true)} 
                onError={err => console.log(err)}
            />
        )

    }

    return (
        <Provider store={store}>
            <NavigationContainer />
        </Provider>
    );
}

export default app;
