import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { register } from "./authRequests";

import { FontAwesome } from "@expo/vector-icons";

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        register(navigation, email, password);
        setEmail("");
        setPassword("");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signInLink}
                onPress={() => navigation.navigate("SignIn")}
            >
                <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30,
    },
    input: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        width: "80%",
        height: 50,
        backgroundColor: "#2196F3",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
    signInLink: {
        marginTop: 20,
    },
    signInText: {
        fontSize: 18,
        textDecorationLine: "underline",
        color: "#2196F3",
    },
});
export default SignUp;
