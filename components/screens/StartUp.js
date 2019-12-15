import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import Spinner from '../Spinner';

import { signIn } from '../../store/actions/auth';

const startUp = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const trySignup = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }

            const transformedData = JSON.parse(userData);
            const { token, userId, expirationDate } = transformedData;
            const expiryDate = new Date(expirationDate);

            if (expiryDate < new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }

            const expirationTime = expiryDate.getTime() - new Date().getTime(); 
            
            props.navigation.navigate('Shop');
            dispatch(signIn(userId, token, expirationTime));
        }

        trySignup();
    }, [dispatch]);

    return (
        <Spinner />
    )
}

export default startUp;