import React from "react";
import { useEffect } from "react";
import Base from './../core/Base';

const Failure = () => {
  useEffect(() => {
    document.title("Payment Failed");
  }, []);
  return <Base title="Payment Failure" description="">
  
  </Base>
};

export default Failure;
