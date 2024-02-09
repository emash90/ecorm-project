import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { useSelector } from 'react-redux';
import { useUserStore } from '../store/store';
import { addProduct, uploadImageToCloudinary, cloudName } from '../apiCalls/apiCalls';

const AddProductForm = () => {
    const { loggedInUser } = useUserStore();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState([])
    const [product_details, setProductDetails] = useState({
        name: '',
        description: '',
        price: '',
        images: [],
        category: '',
        subcategory: '',
        quantity: ''
    })

    const {name, description, price, images, category, subcategory, quantity} = product_details;

    const handleInput = (e) => {
        const {name, value} = e.target;
        setProductDetails({...product_details, [name]: value})
    }

    const clearProductDetails = (e) => {
        e.preventDefault()
        setProductDetails({
            name: '',
            description: '',
            price: '',
            images: [],
            category: '',
            subcategory: '',
            quantity: ''
        })
    }

    //////////////upload product image to cloudinary

   
    const uploadImage = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
    
        try {
            const res = await uploadImageToCloudinary(data);
            console.log("res", res)
            const file = await res
            console.log(file);
            console.log("file url", file.secure_url)
            // Check if the image URL already exists in the imagePreview array
            if (imagePreview.includes(file.secure_url)) {
                console.error('Error: Similar image has already been uploaded.');
                // Handle the error as needed, such as displaying an error message to the user
            } else {
                setImagePreview((prevImages) => [...prevImages, file.secure_url]);
                setProductDetails({ ...product_details, images: [...images, file.secure_url] });
            }
        } catch (err) {
            console.log(err);
        }
    };
    
    

    const handleAddProduct = async (e) => {
        e.preventDefault()
        console.log("product details", product_details)
        if (!name || !description || !price || !category || !subcategory || !quantity) {
            alert("Please fill all the fields")
            return
        }
        product_details.session_id = loggedInUser.session_id;
        try {
                const response = await addProduct(product_details);
                console.log("response", response)
                if (response.message === "Product created successfully") {
                    alert("Product added successfully")
                    navigate('/merchant')
                }
        } catch (error) {
            console.log("error", error)

        }
    }
  return (
    <>
    <h1 className='text-center'>Add Product</h1>
    <hr />
    <Form className='container my-3 py-3'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Enter product name" name='name' value={name} onChange={handleInput} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Description</Form.Label>
        <Form.Control type="text" placeholder="Enter product description" name='description' value={description} onChange={handleInput} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Price</Form.Label>
        <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control type="number" placeholder="Enter product price" name='price' value={price} onChange={handleInput} />
            <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Upload Product Image</Form.Label>
        <Form.Control type="file" placeholder="Enter product image" name='image' onChange={uploadImage} />
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
                                    setProductDetails({ ...product_details, images: images.filter((img) => img !== image) });
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
        <Form.Select aria-label="Default select example" name='category' value={category} onChange={handleInput}>
            <option>Product Category</option>
            <option value="face_product">Face Product</option>
            <option value="hair_product">Hair Product</option>
        </Form.Select>
        <Form.Select aria-label="Default select example" name='subcategory' value={subcategory} onChange={handleInput}>
            {category === 'face_product' && (
                <>
                    <option value="face_cream">Face Cream</option>
                    <option value="face_wash">Face Wash</option>
                    <option value="face_mask">Face Mask</option>
                    <option value="face_scrub">Face Scrub</option>
                </>
            )}
            {category === 'hair_product' && (
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
        <Form.Control type="number" placeholder="Enter product quantity" name='quantity' value={quantity} onChange={handleInput} />
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
