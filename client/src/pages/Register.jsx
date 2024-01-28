import React, { useEffect, useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/store';
const Register = () => {
    const { loggedInUser, setLoggedInUser } = useUserStore();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        user_type: "client"
    })

    const {username, email, password, confirm_password, user_type} = formData;

    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }


    const handleRegister = async (e) => {
        e.preventDefault()
        console.log("form data", formData)
        if (!username || !email || !password) {
            alert("Please fill all the fields")
            return
        }
        if (password !== confirm_password) {
            alert("Password does not match")
            return
        }
        try {
            const url = `${process.env.REACT_APP_API_GATEWAY_HOST}/auth/v1/register`
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }
            const response = await fetch(url, options)
            console.log("response", response)
            if (response.status === 201) {
                const data = await response.json()
                console.log("data", data)
                setLoggedInUser(data)
                alert("Registration Successful")
            }
        } catch (error) {
            console.log("error", error)
            
        }
    }

    useEffect(() => {
        if (loggedInUser && loggedInUser.role === 'client') {
            navigate('/')
        } else if (loggedInUser && loggedInUser.role === 'merchant') {
            navigate('/merchant')
        } else if (loggedInUser && loggedInUser.role === 'admin') {
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
                                <label for="username">Username</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="username"
                                    name="username"
                                    value={username}
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