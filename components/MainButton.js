import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableOpacityBase} from 'react-native';
import colors from '../constants/colors';
const MainButton = props => {
    return (
    <TouchableOpacity onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>
                {props.childern}
            </Text>
        </View>
    </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    button:{
        backgroundColor:colors.primary,
        paddingVertical:12,
        paddingHorizontal:30
    },
    buttonText:{
        color:'black',
        // fontSize:18,
        // fontStyle:('normal', 'italic')
       
        
    }
});

export default MainButton;