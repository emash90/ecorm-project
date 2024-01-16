import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";
import { Nav, NavDropdown } from "react-bootstrap";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import ShowMerchantProducts from "./ShowMerchantProducts";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  const { user } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  const addProduct = (product) => {
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
  const ShowProducts = () => {
    return (
      <>
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <NavDropdown title="Face Products" id="nav-dropdown">
              <NavDropdown.Item onClick={() => setFilter(data)} >All</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> (filterProduct("jewelery"))}>Face Wash</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> (filterProduct("men's clothing"))}>Face Cream</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> (filterProduct("jewelery"))}>Face Mask</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> (filterProduct("jewelery"))}>Face Scrub</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> (filterProduct("jewelery"))}>Face Serum</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> (filterProduct("jewelery"))}>Face Toner</NavDropdown.Item>
            </NavDropdown >
          </Nav.Item>
          <Nav.Item>
            <NavDropdown title="Hair Products" id="nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Shampoo</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Conditioner</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Hair Oil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Hair Serum</NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
        </Nav>
        {filter.map((product) => {
          return (
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                  {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div className="card-body">
                  <Link to={"/product/" + product.id} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          );
        })}
      </>
    );
  };

 
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
          {loading ? <Loading /> : user && user.role === 'merchant' ? <ShowMerchantProducts data={data} /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
