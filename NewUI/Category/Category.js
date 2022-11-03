import { React } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import api from "./../api/webapi";

const Category = ({ category, update }) => {
  function updatecategory(data) {
    console.log(data);
    localStorage.setItem("category", JSON.stringify(data));
  }
  const deletecategory = (id) => {
    console.log(id);
    axios.delete(`${api}/category/deleteCategory/${id}`).then(
      (response) => {
        toast.success("Category Deleted SuccessFully", {
          position: "bottom-center",
          autoClose: 1000,
        });
        update(id);
      },
      (error) => {
        toast.error("Category Not Deleted", {
          position: "bottom-center",
          autoClose: 1000,
        });
      }
    );
  };

  return (
    <div class="w-50 m-auto rounded ">
      <li class="list-group-item d-flex justify-content-between align-items-starts m-1 shadow-sm">
        <div class="ms-2 me-auto">
          <div class="fw-bold">{category.categoryName}</div>
        </div>
        <span class="col-auto">
          <Link
            className="btn btn-outline-success rounded  btn-sm px-4 me-2"
            tag="a"
            to="/updateCategory"
            onClick={() => updatecategory(category)}
            action
          >
            Update
          </Link>
          <div
            class="btn btn-outline-danger rounded  btn-sm px-4"
            onClick={() => {
              console.log(category);
              deletecategory(category.categoryId);
            }}
          >
            Delete
          </div>
        </span>
      </li>
    </div>
  );
};

export default Category;
