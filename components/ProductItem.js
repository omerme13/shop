import React from "react";
import {
    View,
    StyleSheet,
    // TouchableOpacity,
    Image,
    Button
} from "react-native";

import StyledText from "./StyledText";
import StyledButton from "./StyledButton";
import { colors } from '../variables';

const productItem = props => {
    const {
        id,
        customerId,
        title,
        imageUrl,
        description,
        price
    } = props.details;

    return (
        <View style={styles.productItem}>
            <Image source={{uri: imageUrl}} style={styles.image} />
            <StyledText type="title" style={styles.title}>
                {title}
            </StyledText>
            <StyledText type="body" style={styles.price}>
                {price}$
            </StyledText>
            <View style={styles.actions}>
                <StyledButton style={{marginRight:10}} title="View Details" />
                <StyledButton title="To Cart" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productItem: {
        shadowColor: 'black',
        shadowOpacity: 0.15, 
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        elevation: 3,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
        height: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        alignItems: 'center',
        backgroundColor: colors.primaryLight,
        overflow: 'hidden'
    },
    image: {
        height: '50%',
        width: '100%'
    },
    title: {
        color: colors.secondary,
        // backgroundColor: 'red'

    },
    price: {
        marginTop: -12
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20
    }
});

export default productItem;
