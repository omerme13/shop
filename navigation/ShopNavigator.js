import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

import ProductOverview from '../components/screens/shop/ProductOverview';
// import ProductDetail from '../components/screens/shop/ProductDetail';

import { colors } from '../variables';

const ShopNavigator = createStackNavigator({
    ProductOverview, 
    // ProductDetail  
}, 
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(ShopNavigator);