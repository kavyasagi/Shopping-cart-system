import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
const Dashboard = () => {
  const [userprofile, setUserProfile] = useState({});
  const [address, setAddress] = useState([]);

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem("user")));
    setAddress(JSON.parse(localStorage.getItem("user")).userAddresses);
    document.title = "Dashboard";
  }, []);

  return (
    <div className="p-3 text-center">
      <Card
        className="shadow m-auto rounded w-75  p-3 h-100"
        style={{ backgroundColor: "#F4FCD9" }}
      >
        <CardHeader
          tag="h5"
          className="rounded shadow-sm text-center text-light"
          style={{ backgroundColor: "#BB9981" }}
        >
          Dashboard
        </CardHeader>
        <CardBody>
          <ul class="list-group ">
            <li class="row">
              <div class="col-3 rounded ">
                <li class="list-group-item m-1 rounded shadow-sm fw-bold">
                  UserId
                </li>
                <li class="list-group-item m-1 rounded shadow-sm fw-bold">
                  Name
                </li>
                <li class="list-group-item m-1 rounded shadow-sm fw-bold">
                  Email
                </li>
                <li class="list-group-item m-1 rounded shadow-sm fw-bold">
                  Gender
                </li>
                <li class="list-group-item m-1 rounded shadow-sm fw-bold">
                  Contact Number
                </li>
                <li class="list-group-item m-1 rounded shadow-sm fw-bold">
                  DOB
                </li>
                <li class="list-group-item m-1 rounded shadow-sm fw-bold">
                  Role
                </li>
                <li class="list-group-item m-1 rounded shadow-sm fw-bold">
                  Address
                </li>
              </div>
              <div class="col-9 rounded">
                <li class="list-group-item m-1 rounded shadow-sm">
                  {userprofile.userId}
                </li>
                <li class="list-group-item m-1 rounded shadow-sm">
                  {userprofile.userFullName}
                </li>
                <li class="list-group-item m-1 rounded shadow-sm">
                  {userprofile.userEmail}
                </li>
                <li class="list-group-item m-1 rounded shadow-sm">
                  {userprofile.gender}
                </li>
                <li class="list-group-item m-1 rounded shadow-sm">
                  {userprofile.userMobileNo}
                </li>
                <li class="list-group-item m-1 rounded shadow-sm">
                  {userprofile.dateOfBirth}
                </li>
                <li class="list-group-item m-1 rounded shadow-sm">
                  {userprofile.userRole}
                </li>
              
                <div class="list-group m-1 rounded shadow-sm ">
                  <select class="form-select text-center">
                  {address.length > 0
                      ? address.map((address, index) => (
                        <option key={index}
                        className="list-group-item m-1 rounded shadow-sm">
                            {address.houseNo + ", "} 
                            {address.streetName + ", "} 
                            {address.colonyName + ", "} 
                            {address.city + ", "}
                            {address.state + ", "}
                            {address.pinCode + " "}
                          </option>
                        ))
                      : " No Addresses"}
                  </select>
                </div>
              </div>
            </li>
            
          </ul>
          {/* <Link
              className="btn btn-outline-success w-25 rounded btn me-2 mt-2  "
              tag="a"
              to="/updateProduct"
              // onClick={() => updateProduct(product)}
              action
            >
              Update
            </Link>
          <Link
              className="btn btn-outline-danger  w-25 rounded btn me-2 mt-2"
              tag="a"
              to="/updateProduct"
              // onClick={() => updateProduct(product)}
              action
            >
              Delete
            </Link> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
