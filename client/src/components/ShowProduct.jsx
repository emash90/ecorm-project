import React from "react";
import { Carousel, Button, Card } from "react-bootstrap";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

const ShowProduct = ({ product, userRole, addProduct, handleProductEdit, handleProductDelete, showModal, editedProduct, handleClose, handleSave, handleDeleteImage }) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  return (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <Carousel>
            {product.product_images && product.product_images.map((image, index) => (
              <Carousel.Item key={index}>
                <Image cloudName={cloudName} publicId={image} width="400" crop="scale" />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="vertical-line"></div>
        </div>
        <div className="col-md-6 col-md-6 py-5">
          <h4 className="text-uppercase text-muted">{product.category}</h4>
          <h1 className="display-5">{product.name}</h1>
          {userRole === 'client' && (
            <p className="lead">
              {product.rating && product.rating.rate}{" "}
              <i className="fa fa-star"></i>
            </p>
          )}
          <h3 className="display-6  my-4">${product.price}</h3>
          <p className="lead">{product.description}</p>
          {(userRole === 'client' || userRole == null )&& (
            <>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
              <Link to="/" className="btn btn-outline-dark mx-3">
                Continue Shopping
              </Link>
            </>
          )}
          {userRole === 'merchant' && (
            <>
              <Button className='mr-3' variant="primary" type="button" onClick={() => {handleProductEdit(product._id)}}>
                Edit Product
              </Button>
              <Button className='mr-3' variant="warning" type="button" onClick={() => {handleProductDelete()}}>
                Delete Product
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
