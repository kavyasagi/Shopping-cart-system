import axios from "axios";
import api from './../../api/webapi';

export const loadUser = (id) => {

    axios.get(`${api}/profile/getProfile/${id}`).then(
        (response) => { 
            console.log(response);
           localStorage.setItem("user", JSON.stringify(response.data))
        //    localStorage.setItem("address", JSON.stringify(response.data.userAddresses))

        },
        (error) => {
            console.log("Erroer:->>>> " + error);
        }
    )
   };