import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const navigate = useNavigate();
    const [product_details, setProductDetails] = useState({
        product_name: '',
        product_description: '',
        product_price: '',
        product_image: '',
        product_category: '',
        product_subcategory: '',
        product_quantity: ''
    })

    const {product_name, product_description, product_price, product_image, product_category, product_subcategory, product_quantity} = product_details;

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
            product_image: '',
            product_category: '',
            product_subcategory: '',
            product_quantity: ''
        })
    }

    const handleAddProduct = (e) => {
        e.preventDefault()
        console.log("product details", product_details)
        if (!product_name || !product_description || !product_price || !product_category || !product_subcategory || !product_quantity) {
            alert("Please fill all the fields")
            return
        }
        try {
            /////post product details to the backend
            fetch("http://localhost:5000/product/v1/add", {
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
        <Form.Control type="file" placeholder="Enter product image" name='product_image' value={product_image} onChange={handleInput} />
    </Form.Group>
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
