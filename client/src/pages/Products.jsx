import React from 'react'
import { Footer, Navbar, Product } from "../components"
import { useSelector } from 'react-redux'

const Products = () => {
  const {user} = useSelector((state) => state.Auth)
  return (
    <>
      <Navbar />
      <Product  />
      <Footer />
    </>
  )
}

export default Products