import React, { useState } from "react";

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { logIn } from "./authRequests";

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignIn() {
        logIn(navigation, email, password);
        setEmail("");
        setPassword("");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

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

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signUpLink}
                onPress={() => navigation.navigate("Registration")}
            >
                <Text style={styles.signUpText}>Sign Up</Text>
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
    signUpLink: {
        marginTop: 20,
    },
    signUpText: {
        fontSize: 18,
        textDecorationLine: "underline",
        color: "#2196F3",
    },
});

export default SignIn;
