import React from "react";
import api from "./../api/webapi";
import { useState , useEffect } from "react";
import axios from "axios";
import Base from "./../core/Base";
import { checkAuthentication } from './../Auth/helper/authHelper';
import { toast } from 'react-toastify';

const AllUsers = () => {

  const currentUser = checkAuthentication();

  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    console.log(currentUser.jwt);
    axios.get(`${api}/profile/getAllProfiles`,{
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${currentUser.jwt}`
      }
    }).then(
      (response) => {
        setUsers(response.data);
        console.log(users);
      },
      (error) => {
        console.log(error);
        toast.error("Some Error Occured",{
          position: "bottom-center",
        autoClose: 1000,
        });
      }
    );
  };


  useEffect(() => {
    getAllUsers();
    document.title = "All Users";
  }, []);


  return (
    <Base title="Users" description="">
      <div className="container w-50 ">
        <ol class="list-group list-group-numbered ">
        {users.map((user, index) => (
            <li key={index} class="list-group-item d-flex  align-items-start m-1 shadow-sm rounded">
              <div class="ms-2 me-auto">
                <div class="fw-bold ">{user.userFullName} ({user.userRole})</div>
                <div>Email: {user.userEmail}</div>
                <div>Mobile No: {user.userMobileNo}</div>
                <div>About: {user.about}</div>
                <div>DOB: {user.dateOfBirth}</div>
                <div>Gender: {user.gender}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Base> 
  );
};

export default AllUsers;
