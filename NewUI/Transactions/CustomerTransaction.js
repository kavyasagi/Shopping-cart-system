import React from "react";
import api from "../api/webapi";
import { checkAuthentication } from "../Auth/helper/authHelper";
import axios from "axios";
import { useEffect, useState } from "react";
import Base from "./../core/Base";

const CustomerTransaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactionByCustomerId();
  }, []);

  const getTransactionByCustomerId = () => {
    axios
      .get(`${api}/payment/statements/${checkAuthentication().profile.userId}`)
      .then(
        (response) => {
          console.log(response.data);
          setTransactions(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <Base title="My Transactions" description="">
      <div className="container w-50">
        <li class="list-group-item list-group-item-warning shadow-sm mb-1 rounded ">
          <div> Customer Id: {checkAuthentication().profile.userId}</div>

          <div className="text-end fw-bold fs-5">
            {" "}
            {/* Cart Value: Rs {cart.totalPrice}{" "} */}
          </div>
        </li>
        <ol class="list-group list-group-numbered">
          {transactions.length > 0 ? (
            transactions.map((statement, index) => (
              <li
                key={index}
                class="list-group-item d-flex  align-items-start rounded mt-2 shadow-sm"
              >
                <div class="ms-2 me-auto">
                  <div class="fw-bold ">{statement.productName} </div>
                  <div>OrderId : {statement.orderId}</div>
                  <div>Date : {statement.date}</div>
                  <div>Amount: &#x20B9; {statement.amount}</div>
                  <div>Transaction Type : {statement.transactionType}</div>
                </div>
              </li>
            ))
          ) : (
            <div
              class="alert alert-secondary text-center shadow mt-1"
              role="alert"
            >
              No Transactions Found
            </div>
          )}
        </ol>
      </div>
    </Base>
  );
};

export default CustomerTransaction;
