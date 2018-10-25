import React from 'react';
import {Text , StyleSheet} from 'react-native';

const headingText = props =>(
    <Text
        {...props}

        style={styles.textHeading}
    >
        {props.children}
    </Text>
);
const styles =StyleSheet.create({
    textHeading:{
        fontSize:20 ,
        fontWeight:"bold",
        color:"#E6E6FA"
    },
});
export default headingText;