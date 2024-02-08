import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { Loading2, ShowProduct, ShowSimilarProduct } from "../components";
import Marquee from "react-fast-marquee";
import { Modal, Button, Form } from "react-bootstrap";
import { Image } from "cloudinary-react";
import { useCartStore, useUserStore } from "../store/store";
import { editProduct, getProductById, uploadImageToCloudinary } from "../apiCalls/apiCalls";

const Product = () => {
  const { loggedInUser } = useUserStore();
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();
  const userRole = loggedInUser && loggedInUser.user_type;
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [show, setShow] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const [productToSave, setProductToSave] = useState({});

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const handleClose = () => setShow(false);
  const showModal = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);

      try {
        const response = await getProductById(id);
        const data = await response
        setProduct(data);
        setLoading(false);

        // const response2 = await fetch(
        //   // TODO: API to get similar products: get products with the same category
        // );
        // const data2 = await response2
        // setSimilarProducts(data2);
        // setLoading2(false);
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
    const getProduct = async () => {
      try {
        const response = await getProductById(id);
        const data = await response
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

    try {
      const res = await uploadImageToCloudinary(data);
      const file = await res;
      console.log(file);
      console.log("file url", file.secure_url);
      console.log("productToEdit", productToEdit);
      // Check if the image URL already exists in the imagePreview array
      if (productToEdit.images && productToEdit.images.includes(file.secure_url)) {
        console.error("Error: Similar image has already been uploaded.");
        // Handle the error as needed, such as displaying an error message to the user
      } else {
        setProductToEdit({ ...productToEdit, images: [...productToEdit.images, file.secure_url] });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
    

  const handleProductDelete = () => {
    //TODO: API to delete product
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProductToSave(productToEdit);
    const updateProduct = async () => {
      try {
        const response = await editProduct(productToEdit);
        const data = await response;
        setProductToEdit({});
        setProductToSave({});
        if(data) {
          handleClose();
          navigate("/product/" + data._id);
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
    productToEdit.images = productToEdit.images.filter((item) => item !== image);
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
                  name="name"
                  value={productToEdit.name}
                  onChange={handleNewProduct}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product price"
                  name="price"
                  value={productToEdit.price}
                  onChange={handleNewProduct}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product description"
                  name="description"
                  value={productToEdit.description}
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
                {productToEdit.images &&
                  productToEdit.images.map((image, index) => (
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
