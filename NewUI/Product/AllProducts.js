import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import { toast } from "react-toastify";
import Base from "../core/Base";
import { checkAuthentication } from "./../Auth/helper/authHelper";
import api from "./../api/webapi";

function AllProducts() {
  const [Categories, setCategories] = useState({});
  const currentUser = checkAuthentication();

  //fucntion to call server
  const getAllProductFromServer = () => {
    axios.get(`${api}/product/getAllProducts`).then(
      (response) => {
        setProducts(response.data);
        toast.success("Products Loaded", {
          position: "bottom-center",
          autoClose: 1000,
        });
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

  const selectCategory = (name) => {
    axios
      .get(`${api}/product/getProduct/category/${name}`, {
        headers: {
          "Content-type": "application/json",
          Authentication: `Bearer ${currentUser.jwt}`,
        },
      })
      .then(
        (response) => {
          console.log(response.data);
          setProducts(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  //callign loading products funciton
  useEffect(() => {
    getAllProductFromServer();
    getAllCategories();
    document.title = "Manage Products";
  }, []);

  const [Products, setProducts] = useState([]);

  const removeProductById = (id) => {
    setProducts(Products.filter((c) => c.productId !== id));
  };

  return (
    <Base title="Manage Products" description="">
      <div class="row">
        <div className="col-2">
          <div class="list-group">
            <div
              class="list-group-item list-group-item  text-light"
              style={{ backgroundColor: "#BB9981" }}
            >
              Categories
            </div>
            <div
              class="list-group-item list-group-item-action "
              onClick={() => {
                getAllProductFromServer();
              }}
            >
              All Categories
            </div>
            {Categories.length > 0
              ? Categories.map((category) => (
                  <div
                    class="list-group-item list-group-item-action "
                    aria-current="true"
                    key={category.categoryId}
                    onClick={() => {
                      selectCategory(category.categoryName);
                    }}
                  >
                    {category.categoryName}
                  </div>
                ))
              : "No Category Found"}
          </div>
        </div>
        <div class="col">
          <div class="row row-cols-1 row-cols-md-5 g-2 ">
            {Products.length > 0
              ? Products.map((product) => (
                  <Product
                    key={product.productId}
                    product={product}
                    update={removeProductById}
                    adminButtons={true}
                    addtoCartButton={false}
                  />
                ))
              : "No Products"}
          </div>
        </div>
      </div>
    </Base>
  );
}

export default AllProducts;
