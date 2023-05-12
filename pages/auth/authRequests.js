import axios from "axios";
import { storeData, getData, storeUserId } from "../../utils/storage";

const url = "http://10.0.2.2:3000";

export const register = async (navigation, email, password) => {
    try {
        const { data } = await axios.post(`${url}/auth/register`, {
            email,
            password,
        });
        const { accessToken } = data;
        storeData(accessToken);
        authorise(navigation);
    } catch (error) {
        console.log("reg");
        console.log(error);
    }
};

export const logIn = async (navigation, email, password) => {
    try {
        const { data } = await axios.post(`${url}/auth/logIn`, {
            email,
            password,
        });
        const { accessToken } = data;
        storeData(accessToken);
        authorise(navigation);
    } catch (error) {
        console.log("login");
        console.log(error);
    }
};

export const authorise = async (navigation) => {
    try {
        const token = await getData();
        const { data } = await axios.get(`${url}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        storeUserId(data.id);
    } catch (error) {
        console.log("auth");
        console.log(error);
    }
    navigation.navigate("Todo");
};
