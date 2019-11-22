import React from 'react';
import { createAppContainer  } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons';

import ProductOverview from '../components/screens/shop/ProductOverview';
import ProductDetail from '../components/screens/shop/ProductDetail';
import Cart from '../components/screens/customer/Cart';
import Orders from '../components/screens/customer/Orders';

import { colors } from '../variables';

const addIcon = (config, iconName) => (
    <Ionicons 
        name={iconName}
        size={23}
        color={config.tintColor}
    />
);

const navOptions = {
    headerStyle: {
        backgroundColor: colors.primary
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    }
};

const ProductNavigator = createStackNavigator({
    ProductOverview, 
    ProductDetail,
    Cart
}, 
{
    defaultNavigationOptions: navOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => addIcon(drawerConfig, "md-cart")
    }
});

const OrdersNavigator = createStackNavigator({
    Orders
},
{
    defaultNavigationOptions: navOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => addIcon(drawerConfig, "md-list")
    }
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrdersNavigator
},
{
    contentOptions: {
        activeTintColor: colors.primary
    }
});

export default createAppContainer(ShopNavigator);