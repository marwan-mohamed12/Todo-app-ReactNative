import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserId = async (value) => {
    try {
        await AsyncStorage.setItem("@userId", `${value}`);
    } catch (e) {
        console.log("storeData Error");
    }
};

export const getUserId = async () => {
    try {
        const value = await AsyncStorage.getItem("@userId");
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
    }
};
export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem("@accessToken", value);
    } catch (e) {
        console.log("storeData Error");
    }
};

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem("@accessToken");
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
    }
};
