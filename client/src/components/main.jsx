import React from "react";
import bannerImage from "../images/iStock-1443281105.jpg"

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src={bannerImage}
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">Look Good. Feel Good</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
                Genuine Products for all face types and skin tones as well as hair products to make you look good and feel confident everyday. <br />
                <a href="/product" className="btn btn-primary mt-3">Shop Now</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
