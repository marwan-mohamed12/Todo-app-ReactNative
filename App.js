import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

// You can import from local files
import AssetExample from "./components/AssetExample";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [todoText, setTodoText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isChecked, setChecked] = useState(false);

    const addTodo = () => {
        if (todoText !== "") {
            setTodoList([...todoList, { id: Date.now(), text: todoText }]);
            setTodoText("");
        }
    };

    const removeTodo = (id) => {
        const newList = todoList.filter((todo) => todo.id !== id);
        setTodoList(newList);
    };

    const editTodo = (id) => {
        const specficTodo = todoList.find((item) => item.id === id);
        setIsEditing(true);
        setEditId(id);
        setTodoText(specficTodo.text);
    };

    const handleSubmit = () => {
        if (!todoText) {
            // Show Alert
            console.log("Enter Text");
        } else if (todoText && isEditing) {
            // edit
            setTodoList(
                todoList.map((todo) => {
                    if (todo.id === editId) {
                        return { ...todo, text: todoText };
                    }
                    return todo;
                })
            );
            setTodoText("");
            setEditId(null);
            setIsEditing(false);
        } else {
            setTodoList([...todoList, { id: Date.now(), text: todoText }]);
            setTodoText("");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todo App</Text>
            <TextInput
                style={styles.input}
                placeholder="Add a todo..."
                value={todoText}
                onChangeText={(text) => setTodoText(text)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
            >
                <Text style={styles.buttonText}>
                    {isEditing ? "Edit" : "Add"}
                </Text>
            </TouchableOpacity>
            <View style={styles.list}>
                {todoList.map(({ id, text }) => (
                    <View key={id} style={styles.listItem}>
                        <View style={styles.listItemTextBox}>
                            <Checkbox
                                value={isChecked}
                                onValueChange={setChecked}
                                color={"#2196F3"}
                            />
                            <Text
                                style={[
                                    styles.listItemText,
                                    {
                                        textDecorationLine: `${
                                            isChecked ? "line-through" : "null"
                                        }`,
                                    },
                                ]}
                            >
                                {text}
                            </Text>
                        </View>
                        <View style={styles.listItemIcons}>
                            <TouchableOpacity onPress={() => editTodo(id)}>
                                <MaterialIcons
                                    name="mode-edit"
                                    size={24}
                                    color="#2196F3"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => removeTodo(id)}>
                                <MaterialIcons
                                    style={styles.deleteIcon}
                                    name="delete"
                                    size={24}
                                    color="red"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#2196F3",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: "80%",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    list: {
        width: "80%",
    },
    listItem: {
        padding: 10,
        backgroundColor: "#EEE",
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listItemText: {
        fontSize: 25,
        marginLeft: 10,
    },
    listItemTextBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    listItemIcons: {
        flexDirection: "row",
    },
    deleteIcon: {
        marginLeft: 10,
    },
});

export default App;
