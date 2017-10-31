//Import libraries to make a component.
import React from 'react';
import { Text, View } from 'react-native';

//Make a component.
const Header = (props) => {
    const { textStyle, headerContainerStyle } = styles;
    return (
        <View style={headerContainerStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    headerContainerStyle: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: 64,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 32,
        color: '#333'
    }
};

//Make this component available to other sections of the app.
export { Header };
