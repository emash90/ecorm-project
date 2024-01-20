import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from 'cloudinary-react';
import { Card, Carousel } from "react-bootstrap";


const ShowMerchantProducts = ({ data, cloudName }) => {
    const [showModal, setShowModal] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});
    const navigate = useNavigate();

    const productDetails = (product) => {
        console.log("product details", product);
        navigate(`/product/${product.id}`);
    };

    return (
        <>
            {data.length === 0 && (
                <div className="col-12 py-5 text-center">
                    <h1 className="display-5">No Products</h1>
                </div>
            )}
            <div className="col-12 py-5 text-center">
                <Link to="/merchant/add_product" className="btn btn-dark m-1">
                    Add Product
                </Link>
            </div>

            {data.map((product) => {
                return (
                    <Card className="col-12 col-md-4 col-lg-3 m-2" key={product.id}>
                        <Carousel>
                            {product.image.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <Image cloudName={cloudName} publicId={image} width="300" crop="scale" />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <Card.Body style={{cursor: 'pointer'}} onClick={() => productDetails(product)} >
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>$ {product.price}</Card.Text>
                            <Card.Text className="d-flex justify-content-center">
                                <button className="btn btn-dark m-1" onClick={() => productDetails(product)}>
                                    View Product
                                </button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                );
            })}
        </>
    );
};

export default ShowMerchantProducts;
