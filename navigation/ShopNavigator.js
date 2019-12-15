import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import ProductOverview from '../components/screens/shop/ProductOverview';
import ProductDetail from '../components/screens/shop/ProductDetail';
import Cart from '../components/screens/shop/Cart';
import Orders from '../components/screens/shop/Orders';
import UserProducts from '../components/screens/user/UserProducts';
import EditProduct from '../components/screens/user/EditProduct';
import Auth from '../components/screens/user/Auth';
import StartUp from '../components/screens/StartUp';
import StyledButton from '../components/StyledButton';

import { colors } from '../variables';
import { signOut } from '../store/actions/auth';

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

const UserOrdersNavigator = createStackNavigator({
    UserProducts,
    EditProduct
},
{
    defaultNavigationOptions: navOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => addIcon(drawerConfig, "md-create")
    }
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrdersNavigator,
    Admin: UserOrdersNavigator
},
{
    contentOptions: {
        activeTintColor: colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch();

        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                    <DrawerItems {...props} />
                    <StyledButton 
                        style={{alignItems: 'flex-start'}} 
                        title="log out" 
                        onPress={() => dispatch(signOut())}
                        background="transparent"
                        color={colors.primary}
                    />
                </SafeAreaView>
            </View>
        )
    }
});

const AuthNavigator = createStackNavigator({
    Auth
},
{
    defaultNavigationOptions: navOptions
});

const MainNavigator = createSwitchNavigator({
    StartUp,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator);