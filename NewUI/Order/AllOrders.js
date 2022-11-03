import React from "react";
import Base from "./../core/Base";
import { useEffect, useState } from "react";
import api from "./../api/webapi";
import { checkAuthentication } from "./../Auth/helper/authHelper";
import axios from "axios";
import { toast } from "react-toastify";
import { loadOrders } from "./helper/loadOrders";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const allorders = JSON.parse(localStorage.getItem("orders"));

  useEffect(() => {
    document.title = "Orders";
    loadOrders(checkAuthentication().profile.userId);
  }, []);

  // const allorders = JSON.parse(localStorage.getItem("orders"));

  const deleteOrder = (id) => {
    let orders = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.map((order, i) => {
        if (order.orderId === id) {
          orders.splice(i, 1);
        }
      });
      localStorage.setItem("orders", JSON.stringify(orders));

      axios.delete(`${api}/order/deleteOrder/${id}`).then(
        (reponse) => {
          window.location.reload(true);
          toast.success("Order Deleted", {
            position: "bottom-center",
            autoClose: 750,
          });
        },
        (error) => {
          toast.error("Some error occured", {
            position: "bottom-center",
            autoClose: 750,
          });
        }
      );
    }
  };

  const updateOrder = (order) => {
    axios.put(`${api}/order/updateOrder/`, order).then(
      (response) => {
        console.log(response);
        localStorage.setItem("orders", JSON.stringify(allorders));
        window.location.reload(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const initiatePayment = (order) => {
    localStorage.setItem(
      "payment",
      JSON.stringify({
        transactionType: "Online-Payment",
        amount: order.amountPaid,
        orderId: order.orderId,
        customerId: order.customerId,
      })
    );
  };

  return (
    <Base title="My Orders" description="">
      {allorders.length > 0 ? (
        allorders.map((order) => (
          <div className="container w-75 mb-4 ">
            <li class="list-group-item list-group-item-warning shadow fw-bold fs-6 rounded">
              <div> Order ID: {order.orderId} </div>
              <div> Date: {order.orderDate}</div>
              <div className="text-end fw-bold fs-5">
                {" "}
                Order Status : {order.orderStatus}{" "}
              </div>
            </li>
            <ul class="list-group">
              <li class="list-group-item d-flex  align-items-start  shadow">
                <div class="ms-2 me-auto">
                  <div class="fw-bold "> </div>

                  <div>CustomerId: {order.customerId}</div>
                  <div>Name: {order.address.fullName}</div>
                  <div>Contact No: {order.address.mobileNumber}</div>
                  <div>Items: {order.quantity}</div>
                  <div>Mode of Payment: {order.modeOfPayment}</div>

                  <div>
                    Address: {order.address.houseNo + ", "}
                    {order.address.streetName + ", "}
                    {order.address.colonyName + ", "}
                    {order.address.city + ", "}
                    {order.address.state + ", "}
                    {order.address.pinCode + " "}
                  </div>
                </div>

                {order.orderStatus === "Payment Pending" && (
                  <span class="col-auto text-center ">
                    <span class="badge bg-primary rounded-pill m-2 fs-6 ">
                      Order Value :{order.amountPaid}
                    </span>{" "}
                    <br />
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Select Payment Method"
                      className="m-2"
                    >
                      <Dropdown.Item
                        onClick={() => {
                          order.modeOfPayment = "Cash On Delivery";
                          order.orderStatus = "Confirmed";
                          updateOrder(order);
                        }}
                      >
                        Cash On Delivery
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link
                          className="dropdown-item"
                          to="/checkout"
                          tag="a"
                          onClick={() => initiatePayment(order)}
                          action
                        >
                          Online Payment
                        </Link>
                      </Dropdown.Item>
                    </DropdownButton>
                    <div
                      class="btn btn-outline-danger rounded  btn-sm p-2 m-2"
                      onClick={() => {
                        // console.log(product);
                        deleteOrder(order.orderId);
                      }}
                    >
                      Delete Order
                    </div>
                  </span>
                )}

                {order.orderStatus !== "Payment Pending" && (
                  <span class="col-auto text-center ">
                    <span class="badge bg-success rounded-pill m-2 fs-6 ">
                      Order Value :{order.amountPaid}
                    </span>{" "}
                    <br />
                    <div
                      class="btn btn-outline-danger rounded  btn-sm p-2 m-2"
                      onClick={() => {
                        // console.log(product);
                        deleteOrder(order.orderId);
                      }}
                    >
                      Delete Order
                    </div>
                  </span>
                )}
              </li>
              <li className="list-group-item d-flex  align-items-start  shadow">
                <ul class="list-group list-group-horizontal overflow-auto ">
                  {order.product.map((product, index) => (
                    <li
                      key={index}
                      class="list-group-item m-2 shadow-sm rounded"
                    >
                      <div style={{ width: "75px", height: "75px" }}>
                        <img
                          src={product.image}
                          alt=""
                          style={{ height: "75px" }}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <div>Pid: {product.productId}</div>
                        <div class="fw-bold ">{product.productName} </div>
                        <div>Quantity: {product.quantity}</div>
                        <div className="fw-bolder">
                          Price: &#x20B9; {product.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        ))
      ) : (
        <div
          class="alert alert-secondary text-center shadow m-auto w-50"
          role="alert"
        >
          No Orders Found
        </div>
      )}
    </Base>
  );
};

export default AllOrders;
