import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import FormCard from "./../core/FormCard";
import Base from "./../core/Base";
import api from './../api/webapi';

function AddProduct() {
  useEffect(() => {
    document.title = "Add Products";
  }, []);

  const [Product, setProduct] = useState({});
  const [Categories, setCategories] = useState({});
  const formData = new FormData();

  const getAllCategories = () => {
    axios.get(`${api}/category/allCategories`).then(
      (response) => {
        setCategories(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleForm = (e) => {
    console.log(Product);
    postDataToServer(Product);
    e.preventDefault();
  };

  //creating fucntion to post data on sever
  const postDataToServer = (data) => {
    axios.post(`${api}/product/addProduct`, data).then(
      (response) => {
        console.log(response);
        addProduct();
      },
      (error) => {
        console.log(error);
        toast.error("Something went wrong", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
        });
      }
    );
  };

  const uploadImage = (name) => (event) => {
    const imageFile = event.target.files[0];
    formData.set(name, imageFile);
    console.log(formData);
    axios.post(`${api}/product/uploadImage`, formData).then(
      (response) => {
        console.log(response);
        setProduct({ ...Product, image: response.data });
        console.log("success");
      },
      (error) => {
        console.log(error);
        toast.error("Failed to Upload Image", {
          position: "bottom-center",
          autoClose: 1000,
        });
      }
    );
  };

  const addProduct = () =>
    toast.success("Product Added!", {
      position: "top-center",
      autoClose: 1000,
    });

  
  return (
    <Base title="" description="">
      <FormCard header="Add Product">
        <Form onSubmit={handleForm}>
          <FormGroup row>
            <Label for="image" sm={3}>
              Product Image
            </Label>{" "}
            <Col sm={9}>
              <div class="input-group">
                <input
                  type="file"
                  name="image"
                  class="form-control"
                  aria-describedby="uploadButton"
                  onChange={uploadImage("image")}
                />
              </div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="name" sm={3}>
              Product Name
            </Label>{" "}
            <Col sm={9}>
              <Input
                type="text"
                placeholder="Enter Product Name "
                name="name"
                id="name"
                onChange={(e) => {
                  setProduct({ ...Product, productName: e.target.value });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="type" sm={3}>
              Type
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                placeholder="Enter Product Type "
                name="type"
                id="type"
                onChange={(e) => {
                  setProduct({ ...Product, productType: e.target.value });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="category" sm={3}>
              Category
            </Label>
            <Col sm={9}>
              <select
                onChange={(e) => {
                  setProduct({ ...Product, category: e.target.value });
                }}
                className="form-select"
                placeholder="Category"
              >
               <option selected>Select Category</option>
                {Categories.length > 0
                    ? Categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))  
                : "No Category Found"
                }
              </select>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="price" sm={3}>
              Price
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                placeholder="Enter Product Price"
                name="price"
                id="price"
                onChange={(e) => {
                  setProduct({ ...Product, price: e.target.value });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="description" sm={3}>
              Description
            </Label>
            <Col sm={9}>
              <Input
                type="textarea"
                placeholder="Enter Product Description "
                name="description"
                id="description"
                onChange={(e) => {
                  setProduct({ ...Product, description: e.target.value });
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
            <Button
              type="reset"
              className="btn btn-outline-warning rounded btn-block m-2 w-25"
              color="light"
            >
              Clear
            </Button>
          </div>
        </Form>
      </FormCard>
    </Base>
  );
}

export default AddProduct;
