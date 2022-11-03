import React from "react";
import Base from "../core/Base";
import { loadCart } from "./helper/cartHelper";
import { useState, useEffect } from "react";
import { checkAuthentication } from "./../Auth/helper/authHelper";
import api from "./../api/webapi";
import axios from "axios";
import { toast } from "react-toastify";
import { loadOrders } from './../Order/helper/loadOrders';

const Cart = () => {
  const [products, setProducts] = useState([]);

  const cart = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("cart")).items);
    loadCart(checkAuthentication().profile.userId)
    document.title = "Cart";
  }, []);

  const deleteItem = (id) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.items.map((product, i) => {
        if (product.productId === id) {
          cart.totalPrice = cart.totalPrice - product.price * product.quantity;
          cart.items.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      setProducts(JSON.parse(localStorage.getItem("cart")).items);
      updateCartInDB(JSON.parse(localStorage.getItem("cart")));
    }
  };


  const updateCartInDB = (data) => {
    axios
    .put(`${api}/cart/updateCart`, data)
    .then(
      (reponse) => {
        toast.success("Cart updated", {
          position: "bottom-center",
          autoClose: 750,
        });
      },
      (error) => {
        toast.error("Cart not updated in DB", {
          position: "bottom-center",
          autoClose: 750,
        });
      }
    );
  }

  const clearCart = () => {
    let tempcart = JSON.parse(localStorage.getItem("cart"));
    tempcart.totalPrice = 0;
    tempcart.items = [];
    localStorage.setItem("cart", JSON.stringify(tempcart));
    setProducts(JSON.parse(localStorage.getItem("cart")).items);
    updateCartInDB(tempcart);
  }


  const placeOrder = (id) => {
    axios.post(`${api}/order/placeOrder` , cart).then(
      (response) => {
        loadOrders(id);
        clearCart();
        toast.success("Order Placed Check your Orders",{
          position: "bottom-center",
          autoClose: 1500,
        })
      },
      (error) => {
        console.log(error);
      }
    )
  }

  return (
    <Base title="Cart" description="">
      <div className="container w-50">
        <li class="list-group-item list-group-item-warning shadow-sm mb-1 rounded ">
          <div> Cart Id: {cart.cartId}</div>

          <div className="text-end fw-bold fs-5">
            {" "}
            Cart Value: Rs {cart.totalPrice}{" "}
          </div>
        </li>
        <ol class="list-group list-group-numbered">
          {products.length > 0 ? (
            products.map((product, index) => (
              <li
                key={index}
                class="list-group-item d-flex  align-items-start rounded mt-1 shadow"
              >
                <div style={{ width: "75px", height: "75px" }}>
                  <img
                    src={product.image}
                    alt=""
                    style={{ height: "75px" , maxWidth: "75px" }}
                    className="rounded"
                  />
                </div>
                <div class="ms-2 me-auto">
                  <div class="fw-bold ">{product.productName} </div>

                  <div>Quantity : {product.quantity}</div>
                  <div> &#x20B9; {product.price}</div>
                </div>

                <span class="col-auto m-auto me-0 ">
                  <span class="badge bg-primary rounded-pill me-2 fs-6 ">
                    Price : {product.price * product.quantity}
                  </span>
                  <div
                    class="btn btn-outline-danger rounded  btn-sm px-4"
                    onClick={() => {
                      deleteItem(product.productId);
                    }}
                  >
                    Delete
                  </div>
                </span>
              </li>
            ))
          ) : (
            <div
              class="alert alert-secondary text-center shadow mt-1"
              role="alert"
            >
              Cart Is Empty
            </div>
          )}
        </ol>
        {products.length > 0 && (
          <li class="list-group-item list-group-item-warning shadow-sm mt-2 rounded">
            <div className="text-end fw-bold fs-5">
              {" "}
              <div
                class="btn btn-outline-primary rounded  btn-sm px-4"
                onClick={() => {
                  const user = checkAuthentication();
                  placeOrder(user.profile.userId);
                }}
              >
                Place Order
              </div>
            </div>
          </li>
        )}
      </div>
    </Base>
  );
};

export default Cart;
