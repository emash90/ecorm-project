import React, { useEffect, useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/store';
import { registerUser } from '../apiCalls/apiCalls';
import { toast } from 'react-toastify';
const Register = () => {
    const { loggedInUser, setLoggedInUser } = useUserStore();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        user_type: "client"
    })

    const {first_name, last_name, email, password, confirm_password, user_type} = formData;

    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }


    const handleRegister = async (e) => {
        e.preventDefault()
        console.log("form data", formData)
        if (!first_name || !last_name || !email || !password) {
            toast.error("Please fill all the fields")
            return
        }
        if (password !== confirm_password) {
            toast.error("Password does not match")
            return
        }
        try {
            const response = await registerUser(formData)
            // console.log("response", response)
            if (response.message === "success") {
                setLoggedInUser(response.data)

                toast.success("Registration Successful")
            } else {
                toast.error(response.error)
            }
        } catch (error) {
            // console.log("error", error)
            toast.error(error)
        }
    }

    useEffect(() => {
        if (loggedInUser && loggedInUser.user_type === 'client') {
            navigate('/')
        } else if (loggedInUser && loggedInUser.user_type === 'merchant') {
            navigate('/merchant')
        } else if (loggedInUser && loggedInUser.user_type === 'admin') {
            navigate('/admin')
        } else {
            navigate('/register')
        }
    }, [loggedInUser])

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form>
                            <div class="form my-3">
                                <label for="username">First Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="first_name"
                                    name="first_name"
                                    value={first_name}
                                    onChange={handleInput}
                                    placeholder="Enter Your username"
                                />
                            </div>
                            <div class="form my-3">
                                <label for="username">Last Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="last_name"
                                    name="last_name"
                                    value={last_name}
                                    onChange={handleInput}
                                    placeholder="Enter Your username"
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Email"
                                    name="email"
                                    value={email}
                                    onChange={handleInput}
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="Password"
                                    name="password"
                                    value={password}
                                    onChange={handleInput}
                                    placeholder="Password"
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Confirm Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="confirm_password"
                                    name="confirm_password"
                                    value={confirm_password}
                                    onChange={handleInput}
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <div class="form my-3">
                                <label for="user_type">User Type</label>
                                <select
                                    class="form-control"
                                    id="user_type"
                                    name="user_type"
                                    value={user_type}
                                    onChange={handleInput}
                                >
                                    <option value="client">Client User</option>
                                    <option value="merchant">Seller/Merchant User</option>
                                </select>
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit" onClick={handleRegister} >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register