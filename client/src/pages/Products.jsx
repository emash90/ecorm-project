import React from 'react'
import { Footer, Navbar, Product } from "../components"
import { useSelector } from 'react-redux'

const Products = () => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const {user} = useSelector((state) => state.Auth)
  return (
    <>
      <Navbar />
      <Product cloudName={cloudName} uploadPreset={uploadPreset} user={user}  />
      <Footer />
    </>
  )
}

export default Products