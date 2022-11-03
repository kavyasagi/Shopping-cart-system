
import React from "react";
import { useEffect , useState} from "react";
import Base from "./../core/Base";
import { Button } from 'reactstrap';
import { Stripe } from 'react-stripe-checkout';
import AllProducts from './../Product/AllProducts';
import AllOrders from './../Order/AllOrders';
import api from './../api/webapi';
import axios  from 'axios';

const Checkout = () => {
  useEffect(() => {
    document.title = "Checkout";
    setStripeDetails({...stripeDetails, token  : localStorage.getItem("token")});
    setStripeDetails({...stripeDetails, stripe  : window.Stripe(stripeApiToken)});

  }, []);

  const [stripeDetails , setStripeDetails] = useState({
    stripeApiToken: 'pk_test_51KfoGKSHs3LJYPZeitn7uLAP1fxgRCpehQluXPWJIkqZ1pRXYR7kuo8oDSe6zm6nmUW3YFHji4DA93EXuRubSSz700p7lms2V1',
    stripe: '',
    token: null
  })
  
  let checkOutBodyArray = []; 

  const {stripeApiToken , stripe , token} = stripeDetails;

  const goToCheckout = () => {
    checkOutBodyArray = [];
    getItems();
    console.log(checkOutBodyArray);
    axios.post(`${api}/paymentStripe/create-checkout-session` ,checkOutBodyArray)
        .then(
            (response) => { 
                localStorage.setItem("sessionId" , response.data.sessionId)
                console.log('session' , );
                stripe.redirectToCheckout({sessionId: response.data.sessionId})
            },
            (error) => {
                console.log(error);
            }
        )
  }

  const getItems = () => {
      let orderId = JSON.parse(localStorage.getItem("payment")).orderId;
      console.log(orderId);
      let orders = (JSON.parse(localStorage.getItem("orders")).filter((order) => order.orderId === orderId));
      let products = orders[0].product;
        products.map((product) => { 
            checkOutBodyArray.push({
                price: product.price,
                quantity: product.quantity,
                productId: product.productId,
                productName: product.productName,
                userId: orders[0].customerId
            })
        })
  }


  return (
    <Base
      title="Checkout"
      description="You will be redirected to Payment page "
    >
        <div className="text-center">
        <div class="alert alert-warning w-75 m-auto text-center">
        {" "}
        While making payment use card number 4242 4242 4242 4242 and enter
        random data and cvv(3 digit)
      </div>

      <Button
        type="submit"
        className="btn btn-outline-success rounded btn-block m-3 w-25"
        color="light"
        // to="/checkout"\
        // onClick={goToCheckout}
        onClick={() => {goToCheckout()}}
      >
        Make Payment
      </Button>
        </div>
     
    </Base>
  );
};

export default Checkout;
