import axios from 'axios';



const baseURL = process.env.REACT_APP_API_GATEWAY_HOST || "http://localhost:5000";
////login user

export const loginUser = async (user) => {
    try {
        const url = `${baseURL}/auth/v1/login`;
        const response = await axios.post(url, user);
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        return error.response.data;
    }
}

////register user

export const registerUser = async (user) => {
    try {
        const url = `${baseURL}/auth/v1/register`;
        const response = await axios.post(url, user);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        return error.response.data;
    }
}




////add new product

export const addProduct = async (product) => {
    const url = `${baseURL}/api/v1/products`;
    const response = await axios.post(url, product);
    console.log(response.data);
    return response.data;
}

/////

