import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import axios from "axios";
import { toast } from "react-toastify";
import Product from "./../Product/Product";
import { checkAuthentication } from "./../Auth/helper/authHelper";
import api from "./../api/webapi";

export default function Home() {

  const [Products, setProducts] = useState([]);
  const [Categories, setCategories] = useState({});
  const currentUser = checkAuthentication();
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

  useEffect(() => {
    getAllProductFromServer();
    getAllCategories();
    document.title = "Welcome | Home";
  }, []);
  return (
    <Base
      title="Shopping Buddy"
      description="Your one stop for all kinds of products"
    >
      <div>
        <div>
          <div class="row">
            <div className="col-2">
              <div class="list-group shadow-sm">
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
            <div className="col">
              <div class="row row-cols-1 row-cols-md-5 g-2 ">
                {Products.length > 0
                  ? Products.map((product) => (
                      <Product
                        key={product.productId}
                        product={product}
                        addtoCartButton={true}
                      />
                    ))
                  : "No Products"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
