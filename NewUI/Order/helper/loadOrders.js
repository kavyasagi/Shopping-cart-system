import axios from "axios";
import api from './../../api/webapi';

export const loadOrders = (id) => {

    axios.get(`${api}/order/customer/${id}`).then(
        (response) => { 
            console.log(response);
           localStorage.setItem("orders", JSON.stringify(response.data))
        //    localStorage.setItem("address", JSON.stringify(response.data.userAddresses))

        },
        (error) => {
            console.log("Erroer:->>>> " + error);
        }
    )
   };