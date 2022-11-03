import { React } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../core/ProductsCard";
import { Link } from "react-router-dom";
import { loadCart } from "./../Cart/helper/cartHelper";
import api from "./../api/webapi";
import { checkAuthentication } from "./../Auth/helper/authHelper";

const Product = ({ product, update, adminButtons, addtoCartButton }) => {
  const deleteProduct = (id) => {
    console.log(id);
    axios.delete(`${api}/product/deleteProduct/${id}`).then(
      (response) => {
        toast.success("Product Deleted SuccessFully", {
          position: "bottom-center",
          autoClose: 1000,
        });
        update(id);
      },
      (error) => {
        toast.error("Product Not Deleted", {
          position: "bottom-center",
          autoClose: 1000,
        });
      }
    );
  };

  const userProfile = checkAuthentication();

  const addToCart = () => {
    axios
      .post(`${api}/cart/addToCart/${userProfile.profile.userId}`, {
        productName: product.productName,
        quantity: 1,
      })
      .then(
        (response) => {
          loadCart(userProfile.profile.userId);
          toast.success("Item Added to Cart", {
            position: "bottom-center",
            autoClose: 750,
          });
        },
        (error) => {
          console.log(error);
          toast.error("Some error Occured", {
            position: "bottom-center",
            autoClose: 750,
          });
        }
      );
  };

  function updateProduct(data) {
    console.log(data);
    localStorage.setItem("product", JSON.stringify(data));
  }

  return (
    <div className="col">
      <Card product={product}>
        {adminButtons && (
          <div>
            <Link
              className="btn btn-outline-success rounded  btn-sm me-2"
              tag="a"
              to="/updateProduct"
              onClick={() => updateProduct(product)}
              action
            >
              Update
            </Link>

            <div
              class="btn btn-outline-danger rounded  btn-sm "
              onClick={() => {
                console.log(product);
                deleteProduct(product.productId);
              }}
            >
              Delete
            </div>
          </div>
        )}

        {addtoCartButton && (
          <div
            class="btn btn-outline-danger rounded  btn-sm "
            onClick={() => {
              localStorage.getItem("jwt")
                ? addToCart()
                : toast.error("Kindly Login To Add Items in Cart", {
                    position: "bottom-center",
                    autoClose: 1700,
                  });
            }}
          >
            Add to Cart
          </div>
        )}
      </Card>
    </div>
  );
};

export default Product;
