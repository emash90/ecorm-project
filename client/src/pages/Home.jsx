import { useSelector } from "react-redux";
import { Navbar, Main, Product, Footer } from "../components";

function Home() {
  const {user} = useSelector((state) => state.Auth)
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  return (
    <>
      <Navbar />
      <Main />
      <Product cloudName={cloudName} uploadPreset={uploadPreset} user={user} />
      <Footer />
    </>
  )
}

export default Home