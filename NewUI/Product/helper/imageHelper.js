import React from 'react'
import api from './../../api/webapi';


const ImageHelper = ({product}) => {
    // console.log(product.image);
       const imageurl = product ? `${product.image}` : ``
        return (
        <div className="rounded m-auto">
        <img
          src={imageurl}
          alt="photo"
          // style={{ maxHeight: "100%", maxWidth: "100%" }}
          style={{ height: "150px" , maxWidth: "160px" }}
          className="rounded"
        />
      </div>
    )
}

export default ImageHelper;