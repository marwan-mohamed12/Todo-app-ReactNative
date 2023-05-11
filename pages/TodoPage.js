import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import TodoList from "../components/TodoList";

const TodoPage = () => {
    const [todoList, setTodoList] = useState([]);
    const [todoText, setTodoText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const removeTodo = (id) => {
        const newList = todoList.filter((todo) => todo.id !== id);
        setTodoList(newList);
        setIsEditing(false);
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
            setTodoList([
                ...todoList,
                { id: Date.now(), text: todoText, checked: false },
            ]);
            setTodoText("");
        }
    };

    const clearList = () => {
        setTodoList([]);
        setIsEditing(false);
        setTodoText("");
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
            <TodoList
                todoList={todoList}
                editTodo={editTodo}
                removeTodo={removeTodo}
                setTodoList={setTodoList}
                clearList={clearList}
            />
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

export default TodoPage;
