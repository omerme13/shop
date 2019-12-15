import React, { useReducer, useState, useEffect } from "react";
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    Alert
} from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import StyledButton from "../../StyledButton";
import Card from "../../Card";
import FormInput from "../../FormInput";
import Spinner from '../../Spinner';

import { colors } from "../../../variables";
import { authenticate } from "../../../store/actions/auth";
import { formReducer } from "../../../shared/validation";

const auth = props => {
    const dispatch = useDispatch();
    const [isSignup, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: ""
        },
        inputValidities: {
            email: false,
            password: false
        },
        isFormValid: false
    });

    const authHandler = async () => {
        const { email, password } = formState.inputValues;
        setIsLoading(true);
        setError(null);

        try {
            await dispatch(authenticate(isSignup, email, password));
            props.navigation.navigate('Shop');

        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }

    };

    const FORM_UPDATE = "FORM_UPDATE";
    const setTextHandler = (inputType, inputValue, isValid) => {
        formDispatch({
            type: FORM_UPDATE,
            inputValue,
            isValid,
            inputType
        });
    };

    useEffect(() => {
        if (error) {
            Alert.alert('An error has occurred', error, [{text: 'OK'}])
        }
    }, [error])

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset="50"
            style={styles.screen}
        >
            <LinearGradient
                colors={[colors.primaryLight, colors.primary]}
                style={styles.gradient}
            >
                <Card style={styles.auth}>
                    <ScrollView>
                        <FormInput
                            input=""
                            id="email"
                            label="email"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalized="none"
                            set={(inputValue, isValid) =>
                                setTextHandler("email", inputValue, isValid)
                            }
                        />
                        <FormInput
                            input=""
                            id="password"
                            label="password"
                            keyboardType="default"
                            required
                            minLength={6}
                            autoCapitalized="none"
                            secureTextEntry={true}
                            set={(inputValue, isValid) =>
                                setTextHandler("password", inputValue, isValid)
                            }
                        />
                        <View style={styles.buttonsContainer}>
                            {isLoading 
                                ? <Spinner size="small" />
                                : <StyledButton
                                    title={`sign${isSignup ? " up" : "in"}`}
                                    style={{ marginBottom: 15 }}
                                    background={colors.primary}
                                    onPress={authHandler}
                                />
                            }

                            <StyledButton
                                title={`switch to sign${
                                    isSignup ? "in" : " up"
                                }`}
                                background="transparent"
                                color="gray"
                                onPress={() => setIsSignUp(!isSignup)}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

auth.navigationOptions = {
    headerTitle: "Authenticate"
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    auth: {
        width: "70%",
        maxWidth: 400,
        height: 350,
        padding: 20
    },
    buttonsContainer: {
        padding: 20
    }
});

export default auth;
