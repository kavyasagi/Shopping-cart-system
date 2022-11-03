import React, { useState, useEffect } from "react";
import Category from "./Category";
import axios from "axios";
import Base from "../core/Base";
import api from "./../api/webapi";

function AllCategory() {
  useEffect(() => {
    document.title = "Manage Categories";
    getAllCategories();
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

  const [Categories, setCategories] = useState([]);

  const removeCategoryById = (id) => {
    setCategories(Categories.filter((c) => c.categoryId !== id));
  };

  return (
    <Base title="Manage Category" description="">
      <div class="col">
        <ul class="list-group ">
          {Categories.length > 0
            ? Categories.map((category) => (
                <Category
                  key={category.categoryId}
                  category={category}
                  update={removeCategoryById}
                />
              ))
            : "No Category Found"}
        </ul>
      </div>
    </Base>
  );
}

export default AllCategory;
