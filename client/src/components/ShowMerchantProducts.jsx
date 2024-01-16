import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ShowMerchantProducts = ({ data }) => {
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
                    <div
                        id={product._id}
                        key={product._id}
                        className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4 d-flex align-items-stretch"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            productDetails(product);
                        }}
                    >
                        <div
                            className="card text-center h-100"
                            key={product._id}
                        >
                            <img
                                className="card-img-top p-3"
                                src={product.image}
                                alt="Card"
                                height={300}
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {product.name}
                                </h5>
                                <p className="card-text">
                                    {product.description}
                                </p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item lead">
                                    $ {product.price}
                                </li>
                                {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                            </ul>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ShowMerchantProducts;
