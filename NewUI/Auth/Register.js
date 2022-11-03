import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Base from "../core/Base";
import FormCard from "./../core/FormCard";
import api from "./../api/webapi";

function Register() {
  useEffect(() => {
    document.title = "Registration";
  }, []);

  const [Profile, setProfile] = useState({});
  const [Address, setAddress] = useState({});
  var userAddressList = [];

  const handleForm = (e) => {
    // postDataToServer();
    console.log(Profile);
    postDataToServer(Profile);
    e.preventDefault();
  };

  const postDataToServer = (data) => {
    //sending request based on role
    if (data.userRole === "Merchant") {
      axios.post(`${api}/profile/addMerchant`, data).then(
        (response) => {
          successNotify(data.userRole);
        },
        (error) => {
          console.log(error);
          errorNotify();
        }
      );
    } else if (data.userRole === "Delivery Agent") {
      axios.post(`${api}/profile/addDeliveryAgent`, data).then(
        (response) => {
          successNotify(data.userRole);
        },
        (error) => {
          console.log(error);
          errorNotify();
        }
      );
    } else {
      axios.post(`${api}/profile/addCustomer`, data).then(
        (response) => {
          successNotify(data.userRole);
        },
        (error) => {
          console.log(error);
          errorNotify();
        }
      );
    }

    //notificaitons
    const successNotify = (role) => {
      toast.success(`New ${role} Registration Successfull`, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
      });
    };
    const errorNotify = () => {
      toast.error(`Something went Wrong`, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
      });
    };
  };

  return (
    <Base title="" description="">
      <FormCard header="Registration">
          {/* Email */}
          <form onSubmit={handleForm} >
            <div class="row mb-3">
              <label for="email" class="col-sm-3 col-form-label">
                Email
              </label>
              <div class="col-sm-9">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter Email "
                  name="email"
                  id="email"
                  onChange={(e) => {
                    setProfile({ ...Profile, userEmail: e.target.value });
                  }}
                  required
                />

              </div>
            </div>
            
            <div class="row mb-3">
              <label for="name" class="col-sm-3 col-form-label">
                Name
              </label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Name "
                  name="name"
                  id="name"
                  onChange={(e) => {
                    setProfile({ ...Profile, userFullName: e.target.value });
                  }}
                  required
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="password" class="col-sm-3 col-form-label">
                Password
              </label>
              <div class="col-sm-9">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter Password "
                  name="password"
                  id="password"
                  onChange={(e) => {
                    setProfile({ ...Profile, userPassword: e.target.value });
                  }}
                  required
                />
              </div>
            </div>

            <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-3 pt-0">Gender</legend>
              <div class="col-sm-9">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="gender"
                    value="Male"
                    onChange={(e) => {
                      setProfile({ ...Profile, gender: e.target.value });
                    }}
                  />
                  <label class="form-check-label">Male</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="gender"
                    value="Female"
                    onChange={(e) => {
                      setProfile({ ...Profile, gender: e.target.value });
                    }}
                  />
                  <label class="form-check-label">Female</label>
                </div>
              </div>
            </fieldset>

            <div class="row mb-3">
              <label for="dateofbirth" class="col-sm-3 col-form-label">
                Date of Birth
              </label>
              <div class="col-sm-9">
                <input
                  type="date"
                  class="form-control"
                  placeholder="DD-MM-YYYY"
                  name="dateofbirth"
                  id="dateofbirth"
                  onChange={(e) => {
                    setProfile({ ...Profile, dateOfBirth: e.target.value });
                  }}
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="contact" class="col-sm-3 col-form-label">
                Contact Number
              </label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Mobile No. "
                  name="contact"
                  id="contact"
                  maxlength="10"
                  onChange={(e) => {
                    setProfile({ ...Profile, userMobileNo: e.target.value });
                  }}
                />
              </div>
            </div>

            <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-3 pt-0">Role</legend>
              <div class="col-sm-9">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    id="role"
                    value="Customer"
                    onChange={(e) => {
                      setProfile({ ...Profile, userRole: e.target.value });
                    }}
                  />
                  <label class="form-check-label">Customer</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    id="role"
                    value="Merchant"
                    onChange={(e) => {
                      setProfile({ ...Profile, userRole: e.target.value });
                    }}
                  />
                  <label class="form-check-label">Merchant</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    id="role"
                    value="Delivery Agent"
                    onChange={(e) => {
                      setProfile({ ...Profile, userRole: e.target.value });
                    }}
                  />
                  <label class="form-check-label">Delivery Agent</label>
                </div>
              </div>
            </fieldset>

            <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-3 pt-0">Address</legend>
              <div class="col-sm-9">
                <input
                  class="form-control mb-3"
                  type="number"
                  name="houseNo"
                  placeholder="House Number"
                  id="houseNo"
                  onChange={(e) => {
                    setAddress({ ...Address, houseNo: e.target.value });
                  }}
                />

                <input
                  class="form-control mb-3"
                  type="text"
                  name="streetname"
                  placeholder="Street Name"
                  id="streetname"
                  onChange={(e) => {
                    setAddress({ ...Address, streetName: e.target.value });
                  }}
                />

                <input
                  class="form-control mb-3"
                  type="text"
                  name="colonyname"
                  placeholder="Colony Name"
                  id="colonyname"
                  onChange={(e) => {
                    setAddress({ ...Address, colonyName: e.target.value });
                  }}
                />

                <input
                  class="form-control mb-3"
                  type="text"
                  name="city"
                  placeholder="City"
                  id="city"
                  onChange={(e) => {
                    setAddress({ ...Address, city: e.target.value });
                  }}
                />

                <input
                  class="form-control mb-3"
                  type="text"
                  name="state"
                  placeholder="State"
                  id="state"
                  onChange={(e) => {
                    setAddress({ ...Address, state: e.target.value });
                  }}
                />

                <input
                  required
                  class="form-control"
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  id="pincode"
                  maxlength="6"
                  onChange={(e) => {
                    setAddress({ ...Address, pinCode: e.target.value });
                    console.log(Address);
                    userAddressList.push(Address);
                    setProfile({ ...Profile, userAddresses: userAddressList });
                  }}
                />
              </div>
            </fieldset>

            <div class="row mb-3">
              <label for="about" class="col-sm-3 col-form-label">
                About
              </label>
              <div class="col-sm-9">
                <textarea
                  class="form-control"
                  rows="3"
                  placeholder="Give some information about yourself"
                  name="about"
                  id="about"
                  onChange={(e) => {
                    setProfile({ ...Profile, about: e.target.value });
                  }}
                ></textarea>
              </div>
            </div>

            <div className="text-center ">
              <button type="submit" class="btn btn-outline-success btn-block m-2 w-25 rounded">
                  Register
              </button>
              <button type="reset" class="btn btn-outline-warning btn-block m-2 w-25 rounded">
                Clear
              </button>
            </div>
          </form>

          {/* BUttonss */}
     
      </FormCard>
    </Base>
  );
}

export default Register;
