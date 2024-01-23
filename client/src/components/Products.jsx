import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import ShowMerchantProducts from "./ShowMerchantProducts";
import ShowProducts from "./ShowProducts";

const Products = ({ uploadPreset, cloudName, user }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    console.log("add product called", product);
    dispatch(addCart(product))
  }

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/product/v1/all");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
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
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  }


 
  return (
    <>
      <div className="container my-3 py-3">
      {user && user.role === 'client' && (
        <>
                <div className="row">
                <div className="col-12">
                  <h2 className="display-5 text-center">Latest Products</h2>
                  <hr />
                </div>
              </div>
              </>
              )}
      {user && user.role === 'merchant' && (
        <>
                <div className="row">
                <div className="col-12">
                  <h2 className="display-5 text-center">My Products</h2>
                  <hr />
                </div>
              </div>
              </>
              )}
        <div className="row justify-content-center">
          {loading ? <Loading /> : user && user.role === 'merchant' ? <ShowMerchantProducts uploadPreset={uploadPreset} cloudName={cloudName} data={data} /> : <ShowProducts data={data} filter={filter} filterProduct={filterProduct} addProduct={addProduct} />}
        </div>
      </div>
    </>
  );
};

export default Products;
