import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { client } from '../utils/KindeConfig';

import Colors from '../utils/Colors.jsx';
import { Ionicons } from '@expo/vector-icons';


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
            <Image
                source={user?.picture ? { uri: user.picture } : require('../assets/images/abs_545904.png')}
                style={styles.loginBg}
            />
            <View style={styles.stylaligwelconotico}  >
                <View>
                    <Text style={styles.styltxtheader} >Welcome,</Text>
                    <Text style={styles.styluserheader} >{user ?.given_name}</Text>
                </View>
                <Ionicons name="notifications" size={24} color="white" />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    stylimageheader: {
        width: 50,
        height: 50,
        borderRadius: 99,
    },
    styltxtheader: {
        color: Colors.WHITE,
        fontSize: 16,
    },
    styluserheader: {
        color: Colors.WHITE,
        fontSize: 20,
        fontWeight: 'bold',
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

