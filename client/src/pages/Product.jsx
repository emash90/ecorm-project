import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { Loading2, ShowProduct, ShowSimilarProduct } from "../components";
import Marquee from "react-fast-marquee";
import { Modal, Button, Form } from "react-bootstrap";
import { Image } from "cloudinary-react";
import { useCartStore, useUserStore } from "../store/store";

const Product = () => {
  const { loggedInUser } = useUserStore();
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();
  const userRole = loggedInUser && loggedInUser.role;
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [show, setShow] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const [productToSave, setProductToSave] = useState({});

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const handleClose = () => setShow(false);
  const showModal = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const url = process.env.REACT_APP_API_GATEWAY_HOST;
      setLoading(true);
      setLoading2(true);

      try {
        const response = await fetch(`${url}/product/v1/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);

        const response2 = await fetch(
          `${url}/product/v1/similar_products/${data.category}`
        );
        const data2 = await response2.json();
        setSimilarProducts(data2);
        setLoading2(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setLoading2(false);
      }
    };
    getProduct();
    window.scrollTo(0, 0);
  }, [id, productToSave]);

  const addProduct = (product) => {
    console.log("add product called", product);
    addToCart(product);
  }

  const handleProductEdit = (id) => {
    console.log(id);
    showModal();
    const url = process.env.REACT_APP_API_GATEWAY_HOST;
    const getProduct = async () => {
      try {
        const response = await fetch(`${url}/product/v1/${id}`);
        const data = await response.json();
        setProductToEdit(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getProduct();
  };

  const handleNewProduct = (e) => {
    setProductToEdit({
      ...productToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductImageAdd = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        });
      const file = await res.json();
      console.log(file);
      console.log("file url", file.secure_url);
      // Check if the image URL already exists in the imagePreview array
      if (productToEdit.product_images.includes(file.secure_url)) {
        console.error("Error: Similar image has already been uploaded.");
        // Handle the error as needed, such as displaying an error message to the user
      } else {
        setProductToEdit({ ...productToEdit, product_images: [...productToEdit.product_images, file.secure_url] });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
    

  const handleProductDelete = () => {
    console.log("delete");
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Edited Product Details:", productToEdit);
    setProductToSave(productToEdit);
    const url = process.env.REACT_APP_API_GATEWAY_HOST;
    console.log("url", url)
    const updateProduct = async () => {
      try {
        const response = await fetch(`${url}/product/v1/product_edit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productToEdit),
        });
        const data = await response.json();
        console.log("data", data.product);
        setProductToEdit({});
        setProductToSave({});
        if(data.message === "Product edited successfully") {
          handleClose();
          navigate("/product/" + data.product._id);
        } else {
          console.error("Error updating product:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    updateProduct();
    
  };

  const handleDeleteImage = (image) => {
    console.log("delete image", image);
    productToEdit.product_images = productToEdit.product_images.filter((item) => item !== image);
    setProductToEdit({ ...productToEdit });
  }


  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {loading ? (
            <Loading2 />
          ) : (
            <ShowProduct
              product={product}
              userRole={userRole}
              addProduct={addProduct}
              handleProductEdit={handleProductEdit}
              handleProductDelete={handleProductDelete}
              showModal={showModal}
              handleClose={handleClose}
              handleSave={handleSave}
              handleDeleteImage={handleDeleteImage}
            />
          )}
        </div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            {userRole === "client" && (
              <>
                <h2 className="">You may also Like</h2>
                <Marquee
                  pauseOnHover={true}
                  pauseOnClick={true}
                  speed={50}
                >
                  {loading2 ? (
                    <Loading2 />
                  ) : (
                    <ShowSimilarProduct
                      similarProducts={similarProducts}
                      addProduct={addProduct}
                    />
                  )}
                </Marquee>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToEdit && (
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="product_name"
                  value={productToEdit.product_name}
                  onChange={handleNewProduct}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product price"
                  name="product_price"
                  value={productToEdit.product_price}
                  onChange={handleNewProduct}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product description"
                  name="product_description"
                  value={productToEdit.product_description}
                  onChange={handleNewProduct}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Product Category</Form.Label>
                <Form.Select
                  aria-label="Product Category"
                  name="category"
                  value={productToEdit.category}
                  onChange={handleNewProduct}
                >
                  <option value="face_product">Face Product</option>
                  <option value="hair_product">Hair Product</option>
                </Form.Select>
              </Form.Group>
              {productToEdit.category === 'hair_product' && (
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Hair Product Subcategory</Form.Label>
                  <Form.Select
                    aria-label="Hair Product Subcategory"
                    name="hair_subcategory"
                    value={productToEdit.hair_subcategory}
                    onChange={handleNewProduct}
                  >
                    <option value="shampoo">Shampoo</option>
                    <option value="conditioner">Conditioner</option>
                    <option value="styling_products">Styling Products</option>
                    {/* Add other hair product subcategories as needed */}
                  </Form.Select>
                </Form.Group>
              )}
              {productToEdit.category === 'face_product' && (
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Face Product Subcategory</Form.Label>
                  <Form.Select
                    aria-label="Face Product Subcategory"
                    name="face_subcategory"
                    value={productToEdit.face_subcategory}
                    onChange={handleNewProduct}
                  >
                    <option value="cleanser">Cleanser</option>
                    <option value="moisturizer">Moisturizer</option>
                    <option value="serum">Serum</option>
                    {/* Add other face product subcategories as needed */}
                  </Form.Select>
                </Form.Group>
              )}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Upload Product Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Enter product image"
                  name="product_image"
                  onChange={handleProductImageAdd}
                />
              </Form.Group>
              <div className="text-center" style={{ fontSize: '20px' }}>
                {productToEdit.product_images &&
                  productToEdit.product_images.map((image, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && index % 4 === 0 && <br />} {/* Start a new row after every 4 images */}
                      <div style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
                        <span
                          style={{
                            position: 'absolute',
                            top: '1px',
                            right: '1px',
                            cursor: 'pointer',
                            borderRadius: '50%',
                            color: 'red',
                            fontSize: '18px',
                            backgroundColor: 'red',
                          }}
                          onClick={() => handleDeleteImage(image)}
                        >
                          &#10006;
                        </span>
                        <Image cloudName={cloudName} publicId={image} width="100" crop="scale" />
                      </div>
                    </React.Fragment>
                  ))}
              </div>
              <Button variant="primary" type="button" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" type="button" onClick={handleClose}>
                Close
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Product;
