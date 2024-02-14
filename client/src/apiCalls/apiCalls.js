import axios from "axios";

const baseURL = process.env.REACT_APP_API_GATEWAY_HOST;
////login user

export const loginUser = async (user) => {
    try {
        const url = `${baseURL}/api/v1/auth/login`;
        const response = await axios.post(url, user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

////register user

export const registerUser = async (user) => {
    try {
        const url = `${baseURL}/api/v1/auth/register`;
        const response = await axios.post(url, user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

///////get all products

export const getAllProducts = async () => {
    const url = `${baseURL}/api/v1/product`;
    const response = await axios.get(url);
    return response.data;
};

//////get merchant products

export const getMerchantProducts = async (id) => {
    const url = `${baseURL}/api/v1/product/merchant/${id}`;
    const response = await axios.get(url);
    return response.data;
};

////add new product

export const addProduct = async (product) => {
    const url = `${baseURL}/api/v1/product`;
    const response = await axios.post(url, product);
    return response.data;
};

////////////get product by id

export const getProductById = async (id) => {
    const url = `${baseURL}/api/v1/product/${id}`;
    const response = await axios.get(url);
    return response.data;
};

/////edit product

export const editProduct = async (product) => {
    const url = `${baseURL}/api/v1/product/${product._id}`;
    const response = await axios.put(url, product);
    return response.data;
};

/////upload image
export const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export const uploadImageToCloudinary = async (formData) => {
    formData.append("upload_preset", uploadPreset);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await axios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        params: {
            upload_preset: uploadPreset,
        },
    });
    return response.data;
};

/////order apis

export const postNewOrder = async (order) => {
    const url = `${baseURL}/api/v1/order`;
    const response = await axios.post(url, order);
    return response.data;
};
