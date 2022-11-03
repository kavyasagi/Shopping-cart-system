import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";

import { toast } from "react-toastify";
import axios from "axios";

import FormCard from "../core/FormCard";
import Base from "../core/Base";
import api from './../api/webapi';
import { checkAuthentication } from './../Auth/helper/authHelper';

function AddCategory() {

  const currentUser = checkAuthentication();

  useEffect(() => {
    document.title = "Add Category";
  }, []);

  const [Category, setCategory] = useState({
  });
//  const categoryUrl = "http://localhost:7002/category";
  //form handler

  const handleForm = (e) => {
    // postDataToServer();
    console.log(Category);
    postDataToServer(Category);
    e.preventDefault();
  };

  //creating fucntion to post data on sever
  const postDataToServer = (category) => {
    console.log(currentUser.jwt);
    console.log(category);
    axios.post(`${api}/category/addCategory`,category,{
      
    }  ).then(
      (response) => {
        console.log(response);
        addCategory();
      },
      (error) => {
        console.log(error);
        toast.error("Something went wrong", {
          position: "bottom-center",
          autoClose: 1000,
        });
      }
    );
  };

  




  const addCategory = () =>
    toast.success("Category Added!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });


  return (
    <Base title="" description="">
      <FormCard header="Add Category">
        <Form onSubmit={handleForm}>
          <FormGroup row>
            <Label for="name" sm={3}>
              Category Name
            </Label>{" "}
            <Col sm={9}>
              <Input
                type="text"
                placeholder="Enter Category Name "
                name="name"
                id="name"
                onChange={(e) => {
                  setCategory({ ...Category, categoryName: e.target.value });
                }}
              />
            </Col>
          </FormGroup>

          
      
         
      
          <div className="text-center ">
            <Button
              type="submit"
              className="btn btn-outline-success rounded btn-block m-2 w-25"
              color="light"
            >
              Add
            </Button>
           
          </div>
        </Form>
      </FormCard>
    </Base>
  );
}

export default AddCategory;
