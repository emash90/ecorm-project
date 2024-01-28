import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useUserStore } from "../store/store";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loggedInUser, setLoggedInUser } = useUserStore();

  const { email, password } = formData;

  useEffect(() => {
    // This block will run whenever loggedInUser changes
    console.log("Updated loggedInUser:", loggedInUser);

    // Move the navigation logic inside the if block
    if (loggedInUser && loggedInUser.role === "client") {
      navigate("/");
    } else if (loggedInUser && loggedInUser.role === "merchant") {
      navigate("/merchant");
    } else if (loggedInUser && loggedInUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url = process.env.REACT_APP_API_GATEWAY_HOST;
      const response = await fetch(`${url}/auth/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setLoggedInUser(data);
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div className="my-3">
                <label htmlFor="display-4">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  name="email"
                  value={email}
                  onChange={handleInput}
                  placeholder="name@example.com"
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  name="password"
                  value={password}
                  onChange={handleInput}
                  placeholder="Password"
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button
                  className="my-2 mx-auto btn btn-dark"
                  type="submit"
                  onClick={handleLogin}
                >
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
