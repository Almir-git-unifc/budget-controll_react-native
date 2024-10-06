import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('login', jsonValue);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('login');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    console.log('value is null or is undefined');
    // error reading value
    console.error(e);
  }
};
export default {
  storeData,
  getData,
};
