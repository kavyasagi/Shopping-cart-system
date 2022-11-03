import React from 'react'
import Base from './../core/Base';
import { Routes, useLocation ,Route, BrowserRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import AllProducts from './../Product/AllProducts';

const adminLeftSide = () => {
  return (
    <div className="card">
      <h4 className="card-header bg-white text-dark">Merchant Navigation</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/addCategory" className="nav-link text-success">
            Create Categories
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/categories" className="nav-link text-success">
            Manage Categories
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/create/product" className="nav-link text-success">
            Create Product
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/viewProducts" className="nav-link text-success">
            Manage Products
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/orders" className="nav-link text-success">
            Manage Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

const adminRightSide = (name) => {
  return (

    
        // <Route path="/viewProducts" element={<AllProducts />} exact />
   

    <div className="card mb-4 ">
      <h4 className="card-header">Merchant Information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Name :</span>  {name.state.name}
        </li>
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Email :</span> 
        </li>

        <li className="list-group-item">
          <span className="badge bg-danger "> Admin Area </span>
        </li>
      </ul>
    </div>
  );
};

const MerchantDashBoard = () => {

    const name = useLocation();
  return (
    <Base title='' description='Welcome Merchant'>
      <div className="row">
      
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide(name)}</div>
        {/* <div>{adminRightSide(name)}</div> */}
      </div>
</Base>
  )
}

export default MerchantDashBoard