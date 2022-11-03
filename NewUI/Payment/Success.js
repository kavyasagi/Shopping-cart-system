import React from "react";
import { useEffect ,useState } from "react";
import Base from "./../core/Base";
import axios from "axios";
import api from "./../api/webapi";
import { loadOrders } from "./../Order/helper/loadOrders";
import { Link } from "react-router-dom";

const Success = () => {
  useEffect(() => {
    document.title = "Payment SuccessFul";
    getOrderbyId(JSON.parse(localStorage.getItem("payment")).orderId);
  }, []);

  const postDataToServer = (PaymentDetails) => {
      console.log(PaymentDetails);
    axios.post(`${api}/payment/newStatement`, PaymentDetails).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getOrderbyId = (orderId) => {
    let order;
    axios.get(`${api}/order/${orderId}`).then(
      (response) => {
        order = response.data;
        order.modeOfPayment = "Online-Payment";
        order.orderStatus = "Confirmed";
        updateOrderDetails(order);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const updateOrderDetails = (order) => {
    axios.put(`${api}/order/updateOrder/`, order).then(
      (response) => {
        console.log("Order Updated");
        loadOrders(order.customerId);

        postDataToServer({
            transactionType: "OnlinePayment",
            amount: order.amountPaid,
            orderId: order.orderId,
            customerId: order.customerId,
          });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Base title="Payment Success" description="">
      <div className="text-center">
        <Link
          class="btn btn-outline-success rounded btn-block m-3 w-25"
          to="/orders"
          action
        >
          Go to Orders Page
        </Link>
      </div>
    </Base>
  );
};

export default Success;
