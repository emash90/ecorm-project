import React, { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import ShowMerchantProducts from "./ShowMerchantProducts";
import ShowProducts from "./ShowProducts";
import { useCartStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { getAllProducts, getMerchantProducts } from "../apiCalls/apiCalls";

const Products = ({ uploadPreset, cloudName, loggedInUser }) => {
    const navigate = useNavigate();
    const { addToCart } = useCartStore();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    const navigateToProduct = (id) => {
        navigate(`/product/${id}`);
    };

    const addProduct = (product) => {
        console.log("product ===>", product);
        addToCart(product);
    };

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            /// get all products if user is client else get merchant products
            if (loggedInUser && loggedInUser.user_type === "merchant") {
                const response = await getMerchantProducts(loggedInUser._id);
                if (componentMounted) {
                    setData(response);
                    setFilter(response);
                    setLoading(false);
                }
                return () => {
                    componentMounted = false;
                };
            } else {
                const response = await getAllProducts();
            if (componentMounted) {
                setData(response);
                setFilter(response);
                setLoading(false);
            }
            return () => {
                componentMounted = false;
            };
        };
    };

        getProducts();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-12 py-5 text-center">
                    <Skeleton height={40} width={560} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
            </>
        );
    };

    const filterProduct = (cat) => {
        switch (cat) {
            case "all":
                setFilter(data);
                break;
            case "face_products":
                setFilter(
                    data.filter(
                        (product) => product.category === "face_product"
                    )
                );
                break;
            case "hair_products":
                setFilter(
                    data.filter(
                        (product) => product.category === "hair_product"
                    )
                );
                break;
            default:
                setFilter(
                    data.filter((product) => product.subcategory === cat)
                );
                break;
        }
    };

    return (
        <>
            <div className="container my-3 py-3">
                {loggedInUser && loggedInUser.user_type === "client" && (
                    <>
                        <div className="row">
                            <div className="col-12">
                                <h2 className="display-5 text-center">
                                    Latest Products
                                </h2>
                                <hr />
                            </div>
                        </div>
                    </>
                )}
                {loggedInUser && loggedInUser.user_type === "merchant" && (
                    <>
                        <div className="row">
                            <div className="col-12">
                                <h2 className="display-5 text-center">
                                    My Products
                                </h2>
                                <hr />
                            </div>
                        </div>
                    </>
                )}
                <div className="row justify-content-center">
                    {loading ? (
                        <Loading />
                    ) : loggedInUser && loggedInUser.role === "merchant" ? (
                        <ShowMerchantProducts
                            uploadPreset={uploadPreset}
                            cloudName={cloudName}
                            data={data}
                            filter={filter}
                        />
                    ) : (
                        <ShowProducts
                            data={data}
                            filter={filter}
                            filterProduct={filterProduct}
                            addProduct={addProduct}
                            uploadPreset={uploadPreset}
                            cloudName={cloudName}
                            navigateToProduct={navigateToProduct}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Products;
