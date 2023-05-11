import React, { useState } from "react";

import TodoPage from "./pages/TodoPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ title: "Welcome" }}
                />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Todo" component={TodoPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
