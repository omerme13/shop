import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGN_OUT = 'SIGN_OUT';

let timer;

const getErrorMessage = (errorData) => {
    const errorId =  errorData.error.message;
    
    switch(errorId) {
        case 'EMAIL_NOT_FOUND':
            return 'This email could not be found';
        case 'INVALID_EMAIL':
            return 'This email is invalid';
        case 'EMAIL_EXISTS':
            return 'This email already exists';
        case 'INVALID_PASSWORD':
            return 'This password is invalid';
        default:
            return 'Something went wrong';
    }
}

export const signIn = (userId, token, expirationTime) => {

    return dispatch => {
        dispatch(setSignOutTimer(expirationTime));
        dispatch ({
            type: AUTHENTICATE,
            userId,
            token
        });
    }
    


}

export const signOut = () => {
    deleteDataFromStorage();
    clearSignOutTimer();

    return {
        type: SIGN_OUT
    }
}

const setSignOutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(signOut());
        }, expirationTime)
    }
}

const clearSignOutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
}

export const authenticate = (isSignUp, email, password) => {
    const url = isSignUp
        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZqeQ10ZQ7Kj0gnV-tRkDGj21Z9RlotnY'
        : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZqeQ10ZQ7Kj0gnV-tRkDGj21Z9RlotnY';

    return async dispatch => {
        const res = await fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        if (!res.ok) {
            const errorData = await res.json();

            const message = getErrorMessage(errorData);
            throw new Error(message)
        }

        const resData = await res.json();
        const { idToken, localId, expiresIn } = resData;

        dispatch(signIn(localId, idToken, Number(expiresIn) * 1000));

        const expirationDate = new Date(
            new Date().getTime() + Number(resData.expiresIn) * 1000
        );
        saveDataToStorage(idToken, localId, expirationDate);
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token, 
        userId, 
        expirationDate: expirationDate.toISOString()
    }));
}

const deleteDataFromStorage = () => AsyncStorage.removeItem('userData');