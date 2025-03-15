import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { client } from '../utils/KindeConfig';

import Colors from '../utils/Colors.jsx';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



export default function Header() {
    const [user, setUser] = useState();

    useEffect(() => {
        getUserData();
    })

    /** Usado para capturar dados do usuário do */
    const getUserData = async () => {
        const user = await client.getUserDetails();
        setUser(user);
    }

    return (
        <View style={styles.stylaligntext}  >            
            <MaterialCommunityIcons name="car-brake-abs" size={48} color={Colors.ORANGE} />
            <View style={styles.stylaligwelconotico}  >
                <View style={styles.stylTxtWelcome}>
                    <Text style={styles.styltxtheader} >Welcome,</Text>
                    <Text style={styles.styluserheader} >{user ?.given_name}</Text>
                </View>
                <FontAwesome5 name="money-check-alt" size={24} color="white" />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    styltxtheader: {
        color: Colors.WHITE,
        fontSize: 16,
    },
    styluserheader: {
        color: Colors.WHITE,
        fontSize: 20,
        fontWeight: 'bold',
    },
    stylTxtWelcome:{
        paddingLeft: 10,
    },
    stylaligwelconotico: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%'
    },
    stylaligntext: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    }
});

