import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap';
import { useCartStore, useUserStore } from '../store/store';

const Navbar = () => {
    const { loggedInUser, logout  } = useUserStore();
    const { cart } = useCartStore();

    const handleProfile = () => {

    }

    const handleLogout = () => {
        // TODO: 'handle logout'
        logout();
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
                { loggedInUser && loggedInUser.user_type === 'merchant' && (
                    <>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav m-auto my-2 text-center">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/merchant">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/merchant/add_product">
                                        Add Products
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/orders">
                                        My Orders
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">
                                        Contact
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </> 
                    )}
                { (!loggedInUser || loggedInUser.user_type === 'client') && (
                    <>
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
                            </div>
                    </>
                )}
                <div className="d-flex">
                    <div className="buttons text-center">
                        <NavLink to="/cart" className="btn btn-outline-dark m-2">
                            <i className="fa fa-cart-shopping mr-1"></i> Cart ({cart.length})
                        </NavLink>
                        {!loggedInUser ? (
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
                                <DropdownButton as={ButtonGroup} title={loggedInUser.first_name} id="bg-nested-dropdown" variant='dark' >
                                    <Dropdown.Item eventKey="1" onClick={handleProfile}>Profile</Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onClick={handleLogout}>Logout</Dropdown.Item>
                                </DropdownButton>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
