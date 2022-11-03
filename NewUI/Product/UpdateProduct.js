import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Base from "../core/Base";
import FormCard from "../core/FormCard";
import { getProductFromLocalStorage } from "./helper/updateHelper";
import api from './../api/webapi';

function UpdateProduct() {

  const formData = new FormData();
  const [Categories, setCategories] = useState({});
  const [data, setdata] = useState({
    productId: "",
    productName: "",
    productType: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const {
    productId,
    productName,
    productType,
    price,
    category,
    description,
    image,
  } = data;
  const datafromlocalStorage = getProductFromLocalStorage();

  useEffect(() => {
    document.title = "Update Product";
    setdata({
      ...data,
      productId: datafromlocalStorage.productId,
      productName: datafromlocalStorage.productName,
      productType: datafromlocalStorage.productType,
      price: datafromlocalStorage.price,
      category: datafromlocalStorage.category,
      description: datafromlocalStorage.description,
      image: datafromlocalStorage.image,
    });
    console.log("image >>> " + image);
  }, []);


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

  const putDataToServer = () => {
    console.log(data);
    axios.put(`${api}/product/updateProduct`, data).then(
      (response) => {
        console.log(response);
        clearLocalStorage();
        updateSuccess();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const updateSuccess = () =>
    toast.success("Product Updated!", {
      position: "top-center",
      autoClose: 1000,
    });

  const clearLocalStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("product");
    }
  };

  const uploadImage = (name) => event => {
    const imageFile = event.target.files[0];
    formData.set(name, imageFile);
    console.log(formData)
    axios.post(`${api}/product/uploadImage`, formData).then(
      (response) => {
        console.log(response);
        setdata({ ...data, image: response.data });
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


  return (
    <Base title="" description="">
      <FormCard header="Update Product">
        <Form>
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
                  onChange={uploadImage("image")}
                />
              </div>
              <p>PreviousImage: {image}</p>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="name" sm={3}>
              Product Name
            </Label>{" "}
            <Col sm={9}>
              <Input
                type="text"
                name="name"
                id="name"
                value={productName}
                onChange={(e) =>
                  setdata({
                    ...data,
                    productName: e.target.value,
                  })
                }
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
                name="type"
                id="type"
                value={productType}
                onChange={(e) =>
                  setdata({
                    ...data,
                    productType: e.target.value,
                  })
                }
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
                  setdata({ ...data, category: e.target.value });
                }}
                className="form-select"
                placeholder="Category"
                value={category}
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
                name="price"
                id="price"
                value={price}
                onChange={(e) =>
                  setdata({
                    ...data,
                    price: e.target.value,
                  })
                }
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
                name="description"
                id="description"
                value={description}
                onChange={(e) =>
                  setdata({
                    ...data,
                    description: e.target.value,
                  })
                }
              />
            </Col>
          </FormGroup>
          <div className="text-center ">
            <Button
              className="btn btn-outline-success rounded btn-block m-2 w-25"
              color="light"
              onClick={putDataToServer}
            >
              Update
            </Button>
          </div>
        </Form>
      </FormCard>
    </Base>
  );
}

export default UpdateProduct;
