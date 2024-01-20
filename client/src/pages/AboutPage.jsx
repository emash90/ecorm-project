import React from 'react'
import { Footer, Navbar } from "../components";
import shampooImage from "../images/Dangerous-Shampoo-Ingredients03-167587297da745fd8e91424c291a3ffc.jpeg"
import sunScreenImage from "../images/51EGPjqg+DL.jpeg"
import sheaButterImage from "../images/D75_9470-1-scaled.jpeg"
import faceProducts from "../images/Product-Image.webp"
import { Link } from 'react-router-dom';
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
        Welcome to FaceUP Beauty Emporium, your premier destination for exquisite skincare and haircare products tailored to elevate your beauty routine. At Radiant Beauty Emporium, we believe that every woman deserves to feel confident and embrace her natural beauty. Our carefully curated selection of premium skincare and haircare products is designed to enhance your glow, nurture your skin, and elevate your self-care rituals. We are committed to providing you with the best products to help you look and feel your best.
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/product" className="btn btn-dark m-1">
            <div className="card mr-3">
              <img className="card-img-top img-fluid" src={faceProducts} alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Face Cream</h5>
              </div>
            </div>
          </Link>
          <Link to="/product" className="btn btn-dark m-1">
            <div className="card mr-3">
              <img className="card-img-top img-fluid" src={sunScreenImage} alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">SunScreen</h5>
              </div>
            </div>
          </Link>
          <Link to="/product" className="btn btn-dark m-1">
            <div className="card mr-3">
              <img className="card-img-top img-fluid" src={sheaButterImage} alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Natural Shea Butter products</h5>
              </div>
            </div>
          </Link>
          <Link to="/product" className="btn btn-dark m-1">
            <div className="card">
              <img className="card-img-top img-fluid" src={shampooImage} alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Hair Shampoo</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage