// this is the process of encryption and Generate a token for upload image 
// Task :- Send base64 encoded encrypted data to this endpoint in JSON
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, Button } from 'react-native';
import CryptoJS from 'crypto-js';
import base64 from 'react-native-base64'
import axios from 'axios';


export default function App({ navigation }) {
    const [token, setToken] = useState("")
    const [text, setText] = useState("This is some sample plaintext data to encrypt")
    const [cipherText, setCipherText] = useState("")
    const [originalText, setOriginalText] = useState("")


    useEffect(() => {
        encryption();
    }, []);

    // get token api 
    const getToken = async () => {
        const formData = new FormData();
        formData.append('ciphertext', cipherText);
        axios
            .post(`https://www.instantpay.in/ws/AndroidRecruitmentTest/getToken`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                alert(response.msg)
                setToken(response.token)
                setOriginalText(response.orignal_plaintext)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }
    //  encryption method 
    const encryption = () => {
        var secretkey = 'ab821eb4b7d352cd65e84c5a7f38dbb0966262c651cf7064a0d821d8b2a20a5a'; //Length 32
        var key = CryptoJS.enc.Utf8.parse(secretkey);
        var iv = CryptoJS.enc.Utf8.parse(secretkey.substring(0, 16));

        /*-- Encryption --*/
        var raw_ciphertext = CryptoJS.AES.encrypt(text, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        // setCipherText(cipherText);

        const final_ciphertext = base64.encode(raw_ciphertext);
        setCipherText(final_ciphertext);
        getToken();
    }

    return (
        <View style={styles.main} >
            <SafeAreaView>
                <View><Text style={[styles.p_1, styles.fw_bold]}>Task 1 - Send base64 encoded encrypted data to this endpoint in JSON</Text></View>
                <View >
                    <Text style={[styles.p_1, styles.fw_bold]}>Plaintext string to encrypt</Text>
                    {/* <Textinput for string  */}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setText(text)}
                        value={text}
                        placeholder="Enter String"
                        keyboardType="default"
                    />
                </View>
                <View style={styles.btn_container}>
                    <Button title="Encryption" color="#376295" onPress={encryption} />
                </View>

                {/* Base 64 Encoded String  */}
                <View style={styles.btn_container}>
                    <Text style={[styles.p_1, styles.fw_bold]}>base64 encoded encrypted String</Text>
                    <Text style={[styles.p_1,]}>{cipherText}</Text>
                </View>

                {/* click  Go TO Upload Image For Upload Image  */}
                <View style={styles.btn_container}>
                    <Text style={[styles.p_1, styles.fw_bold]}>Original Plaintext </Text>
                    <Text style={[styles.p_1,]}>{originalText}</Text>
                    <Button title="Go TO Upload Image" color="#376295"
                        onPress={() => navigation.navigate('Profile', {
                            token: token,
                        })}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}
const styles = StyleSheet.create({
    main: { padding: 10 },
    cnt: {
        flexDirection: "column",
    },
    btn_container: {
        justifyContent: "flex-end",
        alignItems: "center",
        alignContent: "flex-end"
    },
    ml_1: { marginLeft: 12 },
    p_1: { padding: 10 },
    fw_bold: { fontWeight: "bold" },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});