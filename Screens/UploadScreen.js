// Upload image with gettoken Protected authentication 
// Task :- Send image file in multipart form-data to this endpoint in key image
// in this screen we are getting token in parans from previos screen

import React, { useState, useEffect } from 'react';
import { Button, Text, Image, View, Platform, StyleSheet, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


export default function ImagePickerExample({ navigation, route }) {
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = React.useState([]);
    const [Images, setImages] = useState([])
    const { token } = route.params;

    // pick Image function 
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        var options = {
            uri: result.uri,
            type: result.type,
        };

        setSelectedImage(options)

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    // Upload Image 
    const UploadImage = async () => {
        const formData = new FormData();
        formData.append('image', selectedImage);
        axios
            .post(`https://www.instantpay.in/ws/AndroidRecruitmentTest/uploadImage`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                alert(response.msg)
            })
    };

    return (
        <View >
            <View><Text style={[styles.p_1, styles.fw_bold]}>Task 2 - Upload Image</Text></View>

            <View style={styles.main}>
                {image &&
                    <View >
                        <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 5 }} />
                        <Button style={styles.btn} title="Upload" color="#376295" onPress={UploadImage} />
                    </View>
                }
                {!image && <Button color="#376295" title="Select Photo" onPress={pickImage} />}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    main: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },
    Header: {
        backgroundColor: "#fc0"
    },
    ml_1: { marginLeft: 12 },
    p_1: { padding: 10 },
    fw_bold: { fontWeight: "bold" },
})