import React from 'react'
import { Carousel, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

const ShowProducts = ({ filterProduct, cloudName,  filter, navigateToProduct, setFilter, data }) => {
  return (
    <>
    <Nav className="justify-content-center" activeKey="/home" variant="tabs" bg="light" >
      <Nav.Item>
        <Nav.Link href="/product">All</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <NavDropdown title="Face Products" id="nav-dropdown">
          <NavDropdown.Item onClick={() => filterProduct('face_products')} >All</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("face_wash"))}>Face Wash</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("face_cream"))}>Face Cream</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("face_mask"))}>Face Mask</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("face_scrub"))}>Face Scrub</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("face_serum"))}>Face Serum</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("face_toner"))}>Face Toner</NavDropdown.Item>
        </NavDropdown >
      </Nav.Item>
      <Nav.Item>
        <NavDropdown title="Hair Products" id="nav-dropdown">
          <NavDropdown.Item onClick={() => filterProduct('hair_products')} >All</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("hair_oil"))}>Hair Oil</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("shampoo"))}>Hair Shampoo</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("hair_conditioner"))}>Hair Conditioner</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("hair_serum"))}>Hair Serum</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("hair_mask"))}>Hair Mask</NavDropdown.Item>
          <NavDropdown.Item onClick={()=> (filterProduct("hair_gel"))}>Hair Gel</NavDropdown.Item>
        </NavDropdown>
      </Nav.Item>
    </Nav>
    {filter.map((product) => {
      return (
        <div id={product._id} key={product._id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <div className="card text-center h-100" key={product._id} style={{ cursor: "pointer" }} onClick={() => navigateToProduct(product._id)}>
            <div className='card-img-top'>
              {cloudName && product.images && (
                <Carousel>
                  {product.images.map((image) => {
                    return (
                      <Carousel.Item key={image}>
                        <Image
                          cloudName={cloudName}
                          publicId={image}
                          width="300"
                          crop="scale"
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              )}
            </div>
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
              <Link to={"/product/" + product._id} className="btn btn-dark m-1">
                Buy Now
              </Link>
              {/* <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                Add to Cart
              </button> */}
            </div>
          </div>
        </div>
      );
    })}
  </>
  )
}

export default ShowProducts
