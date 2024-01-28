import React from 'react'
import { Footer, Navbar, Product } from "../components"
import { useUserStore } from '../store/store';

const Products = () => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const {loggedInUser} = useUserStore();
  return (
    <>
      <Navbar />
      <Product cloudName={cloudName} uploadPreset={uploadPreset} loggedInUser={loggedInUser}  />
      <Footer />
    </>
  )
}

export default Products