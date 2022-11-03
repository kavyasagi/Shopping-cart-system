import axios from "axios";
import api from './../../api/webapi';

export const addItemToCart = (item,message) => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            productName: item.productName,
            image:item.image,
            quantity: 1
        })
        
        message();
    }
}


export const loadCart = (id) => {

 axios.get(`${api}/cart/getCart/${id}`).then(
     (response) => { 
         console.log(response);
        localStorage.setItem("cart", JSON.stringify(response.data))
     },
     (error) => {
         console.log("Erroer:->>>> " + error);
     }
 )
};
