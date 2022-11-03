import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormCard from "../core/FormCard";
import api from "./../api/webapi";
import Base from "../core/Base";
import { toast } from "react-toastify";
import { checkAuthentication } from "./helper/authHelper";
import { loadCart } from "../Cart/helper/cartHelper";
import { loadUser } from './../User/helper/userProfile';
import { loadOrders } from './../Order/helper/loadOrders';

function Login() {
  const [LoginDetail, setLoginDetail] = useState({});
  let didRedirect = false;
  const msg = document.getElementById("msg");



  const handleForm = (e) => {
    console.log(LoginDetail);
    postDataToAuthenticate(LoginDetail);
    e.preventDefault();
  };

  const displayError = () => {
    msg.style.display = "block";
  };

  const postDataToAuthenticate = (data) => {
    axios.post(`${api}/authenticate`, data).then(
      (response) => {
        didRedirect = true;
        localStorage.setItem("jwt", JSON.stringify(response.data));

        toast.success("Login Successful!" ,{
          position: "bottom-center",
          autoClose: 1000
        })
        performRedirect();
        
      },
      (error) => {
        console.log(error);
        displayError();
      }
    );
  };

  const navigate = useNavigate();

  const performRedirect = () => {
    const user = checkAuthentication();
    if (user) {
      loadUser(user.profile.userId);
      loadCart(user.profile.userId);
      loadOrders(user.profile.userId)
      navigate("/");
    }
  };

  return (
    <Base title="" description="">
      <FormCard header="Login">
        <Form onSubmit={handleForm}>
          {/* UserName */}
          <FormGroup row>
            <Label for="name" sm={3}>
              Name
            </Label>{" "}
            <Col sm={9}>
              <Input
                type="text"
                placeholder="Enter Full Name "
                name="name"
                id="name"
                onChange={(e) => {
                  setLoginDetail({ ...LoginDetail, username: e.target.value });
                }}
              />
            </Col>
          </FormGroup>
          {/* Password */}
          <FormGroup row>
            <Label for="password" sm={3}>
              Password
            </Label>
            <Col sm={9}>
              <Input
                type="password"
                placeholder="Enter Password "
                name="password"
                id="password"
                onChange={(e) => {
                  setLoginDetail({ ...LoginDetail, password: e.target.value });
                }}
              />
            </Col>
          </FormGroup>

          <div
            class="alert alert-danger"
            role="alert"
            id="msg"
            style={{ display: "none" }}
          >
            Invalid username or password
          </div>

          {/* BUttonss */}
          <div className="text-center ">
            <Button
              type="submit"
              className="btn btn-outline-info shadow-sm btn-block rounded"
              color="light"
            >
              Login
            </Button>
          </div>
        </Form>
      </FormCard>
    </Base>
  );
}

export default Login;
