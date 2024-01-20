import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";
import { Button, Carousel, Modal, Form, Card } from "react-bootstrap";

const Product = () => {
  const {user } = useSelector((state) => state.Auth);
  const user_role = user.role;
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      const url = process.env.REACT_APP_API_GATEWAY_HOST;
      setLoading(true);
      setLoading2(true);
      const response = await fetch(`${url}/product/v1/${id}`);
      const data = await response.json();
      setProduct(data);
      console.log("product", data)
      setLoading(false);
      const response2 = await fetch(
        `http://localhost:5000/product/v1/similar/${data.category}`
      );
      const data2 = await response2.json();
      setSimilarProducts(data2);
      setLoading2(false);
    };
    getProduct();
  }, [id]);

  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleProductEdit = (id) => {
    console.log("product id", id);
    const url = process.env.REACT_APP_API_GATEWAY_HOST;
    fetch(`${url}/product/v1/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("product data", data);
        setEditedProduct(data);
        handleShow();
      });
  };
  console.log("edited product", editedProduct);

  const handleSave = () => {
    const url = process.env.REACT_APP_API_GATEWAY_HOST;
    fetch(`${url}/product/v1/${editedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  const handleDeleteImage = (image) => {
    console.log("remove this", image)
  }



  const handleProductDelete = () => {
  }

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };
  console.log("product", product)
  const ShowProduct = () => {
    return (
      <>
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
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.product_name}</h1>
             {user_role === 'client' && (
               <p className="lead">
               {product.rating && product.rating.rate}{" "}
               <i className="fa fa-star"></i>
             </p>
             )}
              <h3 className="display-6  my-4">${product.product_price}</h3>
              <p className="lead">{product.product_description}</p>
              {user_role === 'client' && (
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
              </>
              )}
              {user_role === 'merchant' && (
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
        <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={editedProduct.product_name}
                                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={editedProduct.product_description}
                                onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={editedProduct.product_price}
                                onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                            />
                        </Form.Group>
                        <h4>Images</h4>
                        <div className="d-flex justify-content-center">
                            {editedProduct.product_images && editedProduct.product_images.map((image, index) => (
                                <Card key={index} className="m-2" style={{ width: '10rem' }}>
                                    <Card.Img variant="top" src={image} />
                                    <Card.Body>
                                        <Button variant="danger" onClick={()=>handleDeleteImage(image)}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="dark" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title.substring(0, 15)}...
                    </h5>
                  </div>
                  {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${product.price}</li>
                  </ul> */}
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.id}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            {user_role === 'client' && (
            <>
          <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
              </Marquee>
            </>
              )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
