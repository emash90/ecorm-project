import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { userLogout } from '../redux/action/userActions';

const Navbar = () => {
    const { user } = useSelector((state) => state.Auth);
    const state = useSelector((state) => state.handleCart);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(userLogout());
        navigate('/login');
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container d-flex justify-content-between align-items-center">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
                    FaceUP
                </NavLink>
                <button
                    className="navbar-toggler mx-2"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">
                                Products
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        <NavLink to="/cart" className="btn btn-outline-dark m-2">
                            <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
                        </NavLink>
                        {!user ? (
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-user mr-1"></i> Login
                                </NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-user-plus mr-1"></i> Register
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/profile" className="btn btn-outline-dark m-1">
                                    <i className="fa fa-user mr-2"></i>
                                    <NavDropdown title={user.name} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
