import axios from 'axios';



const baseURL = process.env.REACT_APP_API_GATEWAY_HOST;
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

///////get all products

export const getAllProducts = async () => {
    const url = `${baseURL}/product/v1/products`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
}


////add new product

export const addProduct = async (product) => {
    const url = `${baseURL}/product/v1/products`;
    const response = await axios.post(url, product);
    console.log(response.data);
    return response.data;
}

////////////get product by id

export const getProductById = async (id) => {
    console.log("id", id);
    const url = `${baseURL}/product/v1/products/${id}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
}

/////edit product 

export const editProduct = async (product) => {
    const url = `${baseURL}/product/v1/products/${product._id}`;
    const response = await axios.put(url, product);
    console.log(response.data);
    return response.data;
}

/////upload image
export const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export const uploadImageToCloudinary = async (formData) => {
    formData.append('upload_preset', uploadPreset);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: {
            upload_preset: uploadPreset
        }
    });
    console.log(response.data);
    return response.data;
}

/////order apis

export const postNewOrder = async (order) => {
    const url = `${baseURL}/orders/v1/order`;
    const response = await axios.post(url, order);
    console.log(response.data);
    return response.data;
}


