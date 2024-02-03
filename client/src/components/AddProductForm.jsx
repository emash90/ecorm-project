import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { useSelector } from 'react-redux';
import { useUserStore } from '../store/store';

const AddProductForm = () => {
    const { loggedInUser } = useUserStore();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState([])
    const [product_details, setProductDetails] = useState({
        product_name: '',
        product_description: '',
        product_price: '',
        product_images: [],
        product_category: '',
        product_subcategory: '',
        product_quantity: ''
    })

    const {product_name, product_description, product_price, product_images, product_category, product_subcategory, product_quantity} = product_details;

    const handleInput = (e) => {
        const {name, value} = e.target;
        setProductDetails({...product_details, [name]: value})
    }

    const clearProductDetails = (e) => {
        e.preventDefault()
        setProductDetails({
            product_name: '',
            product_description: '',
            product_price: '',
            product_images: [],
            product_category: '',
            product_subcategory: '',
            product_quantity: ''
        })
    }

    //////////////upload product image to cloudinary

    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const uploadImage = async (e) => {
        e.preventDefault();
        console.log("cloudName", cloudName)
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', uploadPreset);
    
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: data,
            });
    
            const file = await res.json();
            console.log(file);
            console.log("file url", file.secure_url)
            // Check if the image URL already exists in the imagePreview array
            if (imagePreview.includes(file.secure_url)) {
                console.error('Error: Similar image has already been uploaded.');
                // Handle the error as needed, such as displaying an error message to the user
            } else {
                setImagePreview((prevImages) => [...prevImages, file.secure_url]);
                setProductDetails({ ...product_details, product_images: [...product_images, file.secure_url] });
            }
        } catch (err) {
            console.log(err);
        }
    };
    
    

    const handleAddProduct = (e) => {
        e.preventDefault()
        console.log("product details", product_details)
        if (!product_name || !product_description || !product_price || !product_category || !product_subcategory || !product_quantity) {
            alert("Please fill all the fields")
            return
        }
        product_details.session_id = loggedInUser.session_id;
        const url = process.env.REACT_APP_API_GATEWAY_HOST + '/api/v1/product'
        try {
            /////post product details to the backend
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product_details)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                navigate('/merchant')
            })
            .catch(err => console.log(err))
        }
        catch(err) {
            console.log(err)
            alert("Something went wrong")
        }
    }
  return (
    <>
    <h1 className='text-center'>Add Product</h1>
    <hr />
    <Form className='container my-3 py-3'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Enter product name" name='product_name' value={product_name} onChange={handleInput} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Description</Form.Label>
        <Form.Control type="text" placeholder="Enter product description" name='product_description' value={product_description} onChange={handleInput} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Price</Form.Label>
        <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control type="number" placeholder="Enter product price" name='product_price' value={product_price} onChange={handleInput} />
            <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Upload Product Image</Form.Label>
        <Form.Control type="file" placeholder="Enter product image" name='product_image' onChange={uploadImage} />
    </Form.Group>
    <div className="text-center" style={{ fontSize: '20px' }}>
                {imagePreview.length > 0 &&
                    imagePreview.map((image, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && index % 4 === 0 && <br />} {/* Start a new row after every 4 images */}
                            <Image cloudName={cloudName} publicId={image} width="150" crop="scale" />
                            {/* add x to remove an unwanted image */}
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setImagePreview(imagePreview.filter((img) => img !== image));
                                    setProductDetails({ ...product_details, product_images: product_images.filter((img) => img !== image) });
                                }}
                            >
                                {' '}
                                x
                            </span>{' '}
                            
                        </React.Fragment>
                    ))}
            </div>
    <Form.Text className="text-muted"> product category and sub-category </Form.Text>
    <div className="mb-3 text-center d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap">
        <Form.Select aria-label="Default select example" name='product_category' value={product_category} onChange={handleInput}>
            <option>Product Category</option>
            <option value="face_product">Face Product</option>
            <option value="hair_product">Hair Product</option>
        </Form.Select>
        <Form.Select aria-label="Default select example" name='product_subcategory' value={product_subcategory} onChange={handleInput}>
            {product_category === 'face_product' && (
                <>
                    <option value="face_cream">Face Cream</option>
                    <option value="face_wash">Face Wash</option>
                    <option value="face_mask">Face Mask</option>
                    <option value="face_scrub">Face Scrub</option>
                </>
            )}
            {product_category === 'hair_product' && (
                <>
                    <option value="hair_oil">Hair Oil</option>
                    <option value="hair_shampoo">Hair Shampoo</option>
                    <option value="hair_conditioner">Hair Conditioner</option>
                </>
            )}
        </Form.Select>
    </div>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Quantity</Form.Label>
        <Form.Control type="number" placeholder="Enter product quantity" name='product_quantity' value={product_quantity} onChange={handleInput} />
    </Form.Group>
    <Button className='mr-3' variant="primary" type="submit" onClick={handleAddProduct}>
        Add Product
    </Button>
    <Button className='mr-3' variant="warning" type="button" onClick={clearProductDetails}>
        Clear
    </Button>
    <Button variant="danger" type="button" onClick={() => navigate('/merchant')}>
        Cancel
    </Button>
    </Form>
    </>
  )
}

export default AddProductForm
