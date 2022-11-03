import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Base from "../core/Base";
import FormCard from "../core/FormCard";
import api from "./../api/webapi";
import { checkAuthentication } from "./../Auth/helper/authHelper";

function UpdateCategory() {
  const [data, setdata] = useState({
    categoryId: "",
    categoryName: "",
  });
  const { categoryId, categoryName } = data;

  const datafromlocalStorage = () => {
    return JSON.parse(localStorage.getItem("category"));
  };

  const categoryToUpdate = datafromlocalStorage();

  useEffect(() => {
    document.title = "Update Products";
    setdata({
      ...data,
      categoryId: categoryToUpdate.categoryId,
      categoryName: categoryToUpdate.categoryName,
    });
    console.log(data + data.categoryId + data.categoryName);
  }, []);

  const currentUser = checkAuthentication();
  const putDataToServer = () => {
    console.log(data);
    console.log(currentUser.jwt);
    axios.put(`${api}/category/updateCategory`, data).then(
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
    toast.success("Category Updated!", {
      position: "top-center",
      autoClose: 1000,
    });

  const clearLocalStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("category");
    }
  };

  return (
    <Base title="" description="">
      <FormCard header="Update Category">
        <Form>
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
                value={categoryName}
                onChange={(e) => {
                  setdata({ ...data, categoryName: e.target.value });
                }}
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

export default UpdateCategory;
