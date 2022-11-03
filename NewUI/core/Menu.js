import React, { Fragment, useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { checkAuthentication } from "./../Auth/helper/authHelper";
import { toast } from "react-toastify";
// import { loadCart } from "../Cart/helper/cartHelper";

const Menu = () => {
  const user = checkAuthentication();

  const navigator = useNavigate();
  const Logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      localStorage.removeItem("orders");
      localStorage.removeItem("cart");
      localStorage.removeItem("payment");
      localStorage.removeItem("sessionId");
      console.clear();
      toast.success("Logout Success", {
        position: "bottom-center",
        autoClose: 1000,
      });
      navigator("/");
    }
  };

  return (
    <div>
      <Nav
        class="navbar navbar-expand-sm navbar-light shadow-sm  "
        style={{ backgroundColor: "#F4FCD9" }}
      >
        <div class="container">
          <Link className="navbar-brand " tag="a" to="/" action>
            <img
              src="./logo.png"
              width="30"
              height="24"
              class="d-inline-block align-text-top"
            />
            Shopping Buddy
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <Nav className="me-auto">
                {user.role === "Merchant" && (
                  <NavDropdown title="Products" id="basic-nav-dropdown">
                    <Link
                      className="dropdown-item"
                      tag="a"
                      to="/addProduct"
                      action
                    >
                      Add Product
                    </Link>
                    <Link
                      className="dropdown-item"
                      tag="a"
                      to="/manageProducts"
                      action
                    >
                      Manage Products
                    </Link>
                  </NavDropdown>
                )}

                {user.role === "Merchant" && (
                  <NavDropdown title="Category" id="basic-nav-dropdown">
                    <Link
                      className="dropdown-item"
                      tag="a"
                      to="/addCategory"
                      action
                    >
                      Add Category
                    </Link>
                    <Link
                      className="dropdown-item"
                      tag="a"
                      to="/manageCategories"
                      action
                    >
                      Manage Categories
                    </Link>
                  </NavDropdown>
                )}

                {user.role === "Merchant" && (
                  <NavDropdown title="Users" id="basic-nav-dropdown">
                    <Link className="dropdown-item" tag="a" to="/users" action>
                      All Users
                    </Link>
                  </NavDropdown>
                )}
              </Nav>
            </ul>

            {!localStorage.getItem("jwt") && (
              <ul class="navbar-nav  mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-link" to="/login" action>
                    Login
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/register" action>
                    Register
                  </Link>
                </li>
              </ul>
            )}

            {localStorage.getItem("jwt") && (
              <ul class="navbar-nav  mb-lg-0">
                <li className="nav-item">
                  <Link
                    class="nav-link"
                    to="/profile"
                    state={{ name: user.profile.username }}
                    action
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            )}

            {user.role === "Customer" && (
              <NavDropdown title="Orders" id="basic-nav-dropdown">
                {/* <ul class="navbar-nav  mb-lg-0">
                  <li className="nav-item"> */}
                <Link class="dropdown-item" to="/orders" action>
                  My Orders
                </Link>
                {/* </li>
                  <li className="nav-item"> */}

                {/* </li>
                  <li className="nav-item"> */}
                <Link class="dropdown-item" to="/transactions" action>
                  Transactions
                </Link>
                {/* </li>
                </ul> */}
              </NavDropdown>
            )}

            {user.role === "Customer" && (
              <ul class="navbar-nav  mb-lg-0">
                <li className="nav-item">
                  <Link class="nav-link" to="/cart" action>
                    Cart
                  </Link>
                </li>
              </ul>
            )}

            {localStorage.getItem("jwt") && (
              <ul class="navbar-nav px-3  mb-lg-0 ">
                <li className="nav-item">
                  <button
                    type="button"
                    class="btn btn-danger rounded btn-sm px-2 m-auto shadow-sm"
                    onClick={Logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </Nav>
    </div>
  );
};

export default Menu;
