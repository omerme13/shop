import React, { useEffect, useCallback, useReducer } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../HeaderButton";
import FormControl from "../../FormInput";
import StyledButton from "../../StyledButton";

import Product from "../../../models/product";
import { createProduct, updateProduct } from "../../../store/actions/product";

const FORM_UPDATE = "FORM_UPDATE";
const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.inputType]: action.inputValue
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.inputType]: action.isValid
        };

        let isFormValid;
        for (const key in updatedValidities) {
            if (!updatedValidities[key]) {
                isFormValid = false;
                break;
            }
            isFormValid = true;
        }
        return {
            ...state,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            isFormValid
        };
    }
    return state;
};

const editProduct = props => {
    const id = props.navigation.getParam("id");
    const isUpdateState = id;

    if (isUpdateState) {
        const details = useSelector(state =>
            state.product.userProducts.find(prod => prod.id === id)
        );

        var { title, imageUrl, description, price } = details;
    }

    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            title: isUpdateState ? title : "",
            imageUrl: isUpdateState ? imageUrl : "",
            price: isUpdateState ? price : "",
            description: isUpdateState ? description : ""
        },
        inputValidities: {
            title: isUpdateState ? true : false,
            imageUrl: isUpdateState ? true : false,
            price: isUpdateState ? true : false,
            description: isUpdateState ? true : false
        },
        isFormValid: isUpdateState ? true : false
    });

    const dispatch = useDispatch();

    const saveChangesHandler = useCallback(
        (productId, newProduct) => {
            if (!formState.isFormValid) {
                Alert.alert("Wrong input", "Please check the form again", [
                    { text: "Okay" }
                ]);
                return;
            }

            if (isUpdateState) {
                dispatch(updateProduct(productId, newProduct));
            } else {
                dispatch(createProduct(newProduct));
            }

            props.navigation.goBack();
        },
        [formState]
    );

    const setTextHandler = (inputType, inputValue, isValid) => {
        formDispatch({
            type: FORM_UPDATE,
            inputValue,
            isValid,
            inputType
        });
    };

    useEffect(() => {
        props.navigation.setParams({ saveChanges: saveChangesHandler });
    }, [saveChangesHandler]);

    useEffect(() => {
        const { title, imageUrl, description, price } = formState.inputValues;

        const newProduct = new Product(
            isUpdateState ? id : new Date().toString(),
            "u1",
            title,
            imageUrl,
            description,
            +price // converts the string into a number
        );

        props.navigation.setParams({ newProduct });
    }, [formState]);

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={100}
            style={{flex: 1}}
        >
            <ScrollView>
                <View style={styles.form}>
                    <FormControl
                        label="title"
                        input={formState.inputValues.title}
                        set={(inputValue, isValid) =>
                            setTextHandler("title", inputValue, isValid)
                        }
                        required
                    />
                    <FormControl
                        label="image url"
                        input={formState.inputValues.imageUrl}
                        set={(inputValue, isValid) =>
                            setTextHandler("imageUrl", inputValue, isValid)
                        }
                    />
                    <FormControl
                        label="price"
                        input={formState.inputValues.price}
                        inputType="number-pad"
                        set={(inputValue, isValid) =>
                            setTextHandler("price", inputValue, isValid)
                        }
                        required
                        min={0.1}
                    />
                    <FormControl
                        label="description"
                        input={formState.inputValues.description}
                        set={(inputValue, isValid) =>
                            setTextHandler("description", inputValue, isValid)
                        }
                        required
                        minLength={5}
                    />
                    <StyledButton title="Hello" />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

editProduct.navigationOptions = navData => {
    const productId = navData.navigation.getParam("id");
    const saveChangesFn = navData.navigation.getParam("saveChanges");
    const newProduct = navData.navigation.getParam("newProduct");

    return {
        headerTitle: productId ? "Edit Product" : "Add Product",
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="save"
                    iconName="md-save"
                    onPress={() => saveChangesFn(productId, newProduct)}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 25
    }
});

export default editProduct;
