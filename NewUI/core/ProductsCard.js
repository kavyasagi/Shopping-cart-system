import React from "react";
import { children } from "react";
import AllProducts from "./../Product/AllProducts";
import ImageHelper from "./../Product/helper/imageHelper";
import { addItemToCart } from './../Cart/helper/cartHelper';

const Card = ({
  product,
  children,
}) => {
  


  return (
    <div
      className="card text-center shadow-sm h-100 "
      // style={{ width: "15rem"}}
      
    >
      <div class="card-header ">
        <ImageHelper product={product} />
      </div>

      <ul className="p-0">
        <h5 class="card-title mt-2 fs-5">{product.productName}</h5>
        {/* ProductDetails */}
        {/* <ul class="card-text"> */}
        <div>
          <p class="card-subtitle text-muted  "> {product.productType}</p>
          <p class="card-text fw-bolder">Price: &#x20B9; {product.price}</p>
        </div>
        {/* <li class="list-group-item">{product.category}</li> */}

        {/* </ul> */}

        {/* BUttons */}

        {/* <div className="row">
        <div className="col-12">{showAddToCart(addtoCart)}</div>
        <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
      </div> */}
        {/* <AllProducts/> */}
      </ul>
      <div className="p-1 mt-0">{children}</div>
    </div>
  );
};

export default Card;
