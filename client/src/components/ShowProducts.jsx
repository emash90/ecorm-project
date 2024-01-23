import React from 'react'
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const ShowProducts = ({ filterProduct, filter, addProduct, setFilter, data }) => {
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
                {product.name}
              </h5>
              <p className="card-text">
                {product.description}
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
  )
}

export default ShowProducts
