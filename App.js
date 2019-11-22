import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from 'expo-font';
import { AppLoading } from 'expo'; 
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'; 
import { composeWithDevTools } from 'redux-devtools-extension';

import ShopNavigator from './navigation/ShopNavigator';
import productReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    order: orderReducer
});

// TODO remove composeWithDevTools before deployment
const store = createStore(rootReducer, composeWithDevTools());

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
            <ShopNavigator />
        </Provider>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default app;
