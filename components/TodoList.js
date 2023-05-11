import React from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from "react-native";

const TodoList = ({
    todoList,
    setTodoList,
    editTodo,
    removeTodo,
    clearList,
}) => {
    const handleChange = (id) => {
        let temp = todoList.map((item) => {
            if (id === item.id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setTodoList(temp);
    };

    return (
        <View style={styles.list}>
            {todoList.map(({ id, text, checked }) => {
                return (
                    <View key={id} style={styles.listItem}>
                        <View style={styles.listItemTextBox}>
                            <Pressable onPress={() => handleChange(id)}>
                                <MaterialCommunityIcons
                                    name={
                                        checked
                                            ? "checkbox-marked"
                                            : "checkbox-blank-outline"
                                    }
                                    size={26}
                                    color="#2196F3"
                                />
                            </Pressable>
                            <Text
                                style={[
                                    styles.listItemText,
                                    {
                                        textDecorationLine: `${
                                            checked ? "line-through" : "null"
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
                );
            })}
            {todoList.length < 1 ? null : (
                <TouchableOpacity
                    style={styles.clearListBtn}
                    onPress={clearList}
                >
                    <Text style={styles.clearListText}>Clear List</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
        fontSize: 24,
        marginLeft: 5,
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
    clearListBtn: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: "50%",
        alignSelf: "flex-end",
    },
    clearListText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default TodoList;
