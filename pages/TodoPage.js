import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import TodoList from "../components/TodoList";
import axios from "axios";

const url = "http://10.0.2.2:3000/todos";

const TodoPage = () => {
    const [todoList, setTodoList] = useState([]);
    const [todoText, setTodoText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const removeTodo = (id) => {
        const newList = todoList.filter((todo) => todo.id !== id);
        setTodoList(newList);
        setIsEditing(false);
        deletetodo(id);
    };

    const editTodo = (id) => {
        const specficTodo = todoList.find((item) => item.id === id);
        setIsEditing(true);
        setEditId(id);
        setTodoText(specficTodo.name);
    };

    const handleSubmit = async () => {
        if (!todoText) {
            // Show Alert
            console.log("Enter Text");
        } else if (todoText && isEditing) {
            // edit
            setTodoList(
                todoList.map((todo) => {
                    if (todo.id === editId) {
                        update({ ...todo, name: todoText });
                        return { ...todo, name: todoText };
                    }
                    return todo;
                })
            );
            setTodoText("");
            setEditId(null);
            setIsEditing(false);
        } else {
            let id = await add(todoText);
            setTodoList([...todoList, { id, name: todoText, checked: false }]);
            setTodoText("");
        }
    };

    const clearList = () => {
        clear();
        setTodoList([]);
        setIsEditing(false);
        setTodoText("");
    };

    const fetchData = async () => {
        try {
            const { data } = await axios(url);
            setTodoList(data);
        } catch (error) {
            console.log(error);
        }
    };

    const update = async (item) => {
        try {
            const resp = await axios.put(`${url}/${item.id}`, item);
        } catch (error) {
            console.log(error);
        }
    };
    const add = async (todoText) => {
        try {
            const resp = await axios.post(`${url}`, {
                name: todoText,
                isChecked: false,
                userId: 1,
            });
            return resp.data.id;
        } catch (error) {
            console.log(error);
        }
    };

    const clear = async () => {
        try {
            const resp = await axios.delete(`${url}/clear`);
            console.log(resp.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deletetodo = async (id) => {
        try {
            const resp = await axios.delete(`${url}/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                update={update}
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
