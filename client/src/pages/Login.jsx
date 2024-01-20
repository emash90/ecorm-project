import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import  { userLoginSuccess } from "../redux/action/userActions";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user_data, setUser_data] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  const handleLogin = (e) => {
    e.preventDefault()

    /////////////////////////get the data from the backend
    fetch("http://localhost:5000/auth/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(data => {
      setUser_data(data)
      dispatch(userLoginSuccess(data))
    })
    .catch(err => console.log(err))    
  }


    if(user_data.role === "client") {
      navigate("/")
    } else if (user_data.role === "admin") {
      navigate("/admin")
    } else if (user_data.role === "merchant") {
      navigate("/merchant")
    }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  name="email"
                  value={email}
                  onChange={handleInput}
                  placeholder="name@example.com"
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  name="password"
                  value={password}
                  onChange={handleInput}
                  placeholder="Password"
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
